/**
 * Admin Articles Enhanced
 * Gerenciamento de artigos com UX avançada
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Calendar, Edit, Eye, ChevronLeft, ChevronRight, Plus, Home, AlertCircle,
  Search, Filter, Grid, List, SortAsc, SortDesc, Trash2, Copy, Share2,
  Clock, User, Tag, TrendingUp, FileText
} from "lucide-react";
import { articlesApi } from "../api";
import { Article } from "../types";
import { useModal } from "@/hooks/useModal";
import { PageShell } from "@/components/layout/PageShell";
import { useDesignSystem } from "@/hooks/useDesignSystem";

type ViewMode = 'grid' | 'list';
type SortBy = 'date' | 'title' | 'views' | 'category';
type FilterBy = 'all' | 'active' | 'inactive' | 'draft';

const AdminArticlesEnhanced = () => {
  const navigate = useNavigate();
  const { showError, showWarning, showSuccess, showConfirm } = useModal();
  const { systemName } = useDesignSystem();
  
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortBy>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filterBy, setFilterBy] = useState<FilterBy>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [homepageArticles, setHomepageArticles] = useState<string[]>([]);
  const [switchLoading, setSwitchLoading] = useState<string | null>(null);
  
  const articlesPerPage = viewMode === 'grid' ? 9 : 10;

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const response = await articlesApi.getAll();
      setArticles(response.articles);
      
      const homepageIds = response.articles
        .filter(article => article.active)
        .map(article => article.id);
      setHomepageArticles(homepageIds);
    } catch (error) {
      console.error('Erro ao carregar artigos:', error);
      showError('Erro ao carregar artigos');
    } finally {
      setLoading(false);
    }
  };

  const handleHomepageToggle = async (articleId: string, isChecked: boolean) => {
    try {
      if (isChecked && homepageArticles.length >= 3) {
        showWarning('Você só pode selecionar até 3 artigos para a tela inicial.');
        return;
      }

      setSwitchLoading(articleId);
      await articlesApi.update(articleId, { active: isChecked });
      
      if (isChecked) {
        setHomepageArticles([...homepageArticles, articleId]);
      } else {
        setHomepageArticles(homepageArticles.filter(id => id !== articleId));
      }

      setArticles(articles.map(article => 
        article.id === articleId 
          ? { ...article, active: isChecked }
          : article
      ));

      showSuccess(isChecked ? 'Artigo ativado na homepage' : 'Artigo removido da homepage');
    } catch (error) {
      console.error('Erro ao atualizar artigo:', error);
      showError('Erro ao atualizar artigo');
    } finally {
      setSwitchLoading(null);
    }
  };

  const handleDelete = (article: Article) => {
    showConfirm(
      `Tem certeza que deseja excluir "${article.title}"?`,
      async () => {
        try {
          await articlesApi.delete(article.id);
          showSuccess('Artigo excluído!');
          loadArticles();
        } catch (error) {
          showError('Erro ao excluir artigo');
        }
      },
      {
        title: 'Excluir Artigo',
        confirmText: 'Excluir',
        cancelText: 'Cancelar'
      }
    );
  };

  const handleDuplicate = async (article: Article) => {
    try {
      await articlesApi.create({
        ...article,
        title: `${article.title} (Cópia)`,
        active: false,
      });
      showSuccess('Artigo duplicado!');
      loadArticles();
    } catch (error) {
      showError('Erro ao duplicar artigo');
    }
  };

  // Filtros e ordenação
  const categories = Array.from(new Set(articles.map(a => a.category)));
  
  const filteredAndSortedArticles = articles
    .filter(article => {
      // Filtro de busca
      const matchesSearch = 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filtro de status
      const matchesFilter = 
        filterBy === 'all' ? true :
        filterBy === 'active' ? article.active :
        filterBy === 'inactive' ? !article.active :
        false; // draft
      
      // Filtro de categoria
      const matchesCategory = 
        selectedCategory === 'all' ? true :
        article.category === selectedCategory;
      
      return matchesSearch && matchesFilter && matchesCategory;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'date':
          comparison = new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
        case 'views':
          comparison = (a.views || 0) - (b.views || 0);
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  // Paginação
  const totalPages = Math.ceil(filteredAndSortedArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const currentArticles = filteredAndSortedArticles.slice(startIndex, startIndex + articlesPerPage);

  const stats = {
    total: articles.length,
    active: articles.filter(a => a.active).length,
    inactive: articles.filter(a => !a.active).length,
    categories: categories.length,
  };

  if (loading) {
    return <PageShell title="Gerenciar Artigos" loading={true}><div>Carregando...</div></PageShell>;
  }

  return (
    <PageShell
      title="Gerenciar Artigos"
      subtitle={`${stats.total} artigos • ${stats.active} ativos • ${stats.categories} categorias`}
      maxWidth="7xl"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ativos</p>
                <p className="text-2xl font-bold">{stats.active}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Inativos</p>
                <p className="text-2xl font-bold">{stats.inactive}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Categorias</p>
                <p className="text-2xl font-bold">{stats.categories}</p>
              </div>
              <Tag className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Homepage Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Home className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-blue-900 dark:text-blue-100">
              Artigos na tela inicial: {homepageArticles.length}/3
            </span>
          </div>
          {homepageArticles.length === 3 && (
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span className="text-sm text-amber-800 dark:text-amber-200">
                Limite máximo atingido
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Toolbar */}
      <div className="mb-6 space-y-4">
        {/* Linha 1: Busca e Novo */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Buscar por título, categoria ou conteúdo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={() => navigate('/admin/artigos/novo')}>
            <Plus className="w-4 h-4 mr-2" />
            Novo Artigo
          </Button>
        </div>

        {/* Linha 2: Filtros e Visualização */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex gap-2 flex-wrap">
            {/* Filtro de Status */}
            <Select value={filterBy} onValueChange={(value: FilterBy) => setFilterBy(value)}>
              <SelectTrigger className="w-[140px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="active">Ativos</SelectItem>
                <SelectItem value="inactive">Inativos</SelectItem>
              </SelectContent>
            </Select>

            {/* Filtro de Categoria */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[140px]">
                <Tag className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Ordenação */}
            <Select value={sortBy} onValueChange={(value: SortBy) => setSortBy(value)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Data</SelectItem>
                <SelectItem value="title">Título</SelectItem>
                <SelectItem value="category">Categoria</SelectItem>
                <SelectItem value="views">Visualizações</SelectItem>
              </SelectContent>
            </Select>

            {/* Ordem */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            >
              {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
            </Button>
          </div>

          {/* Modo de Visualização */}
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Articles Display */}
      {viewMode === 'grid' ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentArticles.map((article) => (
            <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                {article.image ? (
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="h-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                    <Calendar className="w-12 h-12 text-primary/40" />
                  </div>
                )}
              </div>

              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {article.category}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {new Date(article.createdAt).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                <CardTitle className="text-lg line-clamp-2">
                  {article.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-0 space-y-4">
                {/* Homepage Toggle */}
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Home className="w-4 h-4" />
                    <span className="text-sm font-medium">Homepage</span>
                  </div>
                  <Switch
                    checked={article.active || false}
                    onCheckedChange={(checked) => handleHomepageToggle(article.id, checked)}
                    disabled={switchLoading === article.id || (!article.active && homepageArticles.length >= 3)}
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => navigate(`/artigo/${article.id}`)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => navigate(`/admin/artigos/editar/${article.id}`)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDuplicate(article)}>
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(article)} className="text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4 mb-8">
          {currentArticles.map((article) => (
            <Card key={article.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-6">
                  {article.image && (
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-24 h-24 rounded object-cover"
                    />
                  )}

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-lg">{article.title}</h3>
                      <Badge variant="secondary">{article.category}</Badge>
                      {article.active && <Badge>Homepage</Badge>}
                    </div>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(article.createdAt).toLocaleDateString('pt-BR')}
                      </span>
                      {article.views && (
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {article.views} views
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => navigate(`/artigo/${article.id}`)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => navigate(`/admin/artigos/editar/${article.id}`)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDuplicate(article)}>
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(article)} className="text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {currentArticles.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Nenhum artigo encontrado</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm ? "Tente ajustar sua busca" : "Comece criando seu primeiro artigo"}
          </p>
          {!searchTerm && (
            <Button onClick={() => navigate('/admin/artigos/novo')}>
              <Plus className="w-4 h-4 mr-2" />
              Criar Primeiro Artigo
            </Button>
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(page)}
              className="w-10"
            >
              {page}
            </Button>
          ))}
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </PageShell>
  );
};

export default AdminArticlesEnhanced;
