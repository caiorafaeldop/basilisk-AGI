/**
 * Admin Team Enhanced
 * Gerenciamento de equipe com UX avançada
 */

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ImageUpload from "@/components/ui/image-upload";
import { 
  Plus, Edit, Trash2, Eye, EyeOff, User, Users, ArrowLeft, 
  Search, Filter, Grid, List, SortAsc, SortDesc, Download, Upload,
  Star, Mail, Phone, Linkedin, Twitter, GripVertical
} from "lucide-react";
import { useModal } from "@/hooks/useModal";
import { useNavigate } from "react-router-dom";
import { teamApi } from "../api";
import { TeamMember, CreateTeamMemberRequest, UpdateTeamMemberRequest } from "../types";
import { PageShell } from "@/components/layout/PageShell";
import { useDesignSystem } from "@/hooks/useDesignSystem";

type ViewMode = 'grid' | 'list';
type SortBy = 'name' | 'position' | 'created' | 'updated';
type FilterBy = 'all' | 'active' | 'inactive';

const AdminTeamEnhanced = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortBy>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filterBy, setFilterBy] = useState<FilterBy>('all');
  const { showSuccess, showError, showConfirm } = useModal();
  const { systemName } = useDesignSystem();
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState<CreateTeamMemberRequest>({
    name: "",
    position: "",
    description: "",
    image: "",
    email: "",
    active: true
  });

  useEffect(() => {
    loadTeamMembers();
  }, []);

  const loadTeamMembers = async () => {
    try {
      setLoading(true);
      const response = await teamApi.getAll();
      setTeamMembers(response.team);
    } catch (error) {
      showError("Erro ao carregar membros da equipe");
      console.error("Error loading team members:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.position.trim() || !formData.description.trim()) {
      showError("Preencha todos os campos obrigatórios");
      return;
    }

    try {
      if (editingMember) {
        const updateData: UpdateTeamMemberRequest = {
          name: formData.name,
          position: formData.position,
          description: formData.description,
          image: formData.image || undefined,
          email: formData.email || undefined,
          active: formData.active
        };
        await teamApi.update(editingMember.id, updateData);
        showSuccess("Membro atualizado com sucesso!");
      } else {
        await teamApi.create(formData);
        showSuccess("Membro criado com sucesso!");
      }
      
      resetForm();
      loadTeamMembers();
    } catch (error) {
      showError(editingMember ? "Erro ao atualizar" : "Erro ao criar");
      console.error("Error saving team member:", error);
    }
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      position: member.position,
      description: member.description,
      image: member.image || "",
      email: member.email || "",
      active: member.active
    });
    setShowForm(true);
  };

  const handleDelete = (member: TeamMember) => {
    showConfirm(
      `Tem certeza que deseja excluir "${member.name}"?`,
      async () => {
        try {
          await teamApi.delete(member.id);
          showSuccess("Membro excluído!");
          loadTeamMembers();
        } catch (error) {
          showError("Erro ao excluir");
        }
      },
      {
        title: "Excluir Membro",
        confirmText: "Excluir",
        cancelText: "Cancelar"
      }
    );
  };

  const handleToggleActive = async (member: TeamMember) => {
    try {
      await teamApi.toggleActive(member.id);
      showSuccess(`Membro ${member.active ? 'desativado' : 'ativado'}!`);
      loadTeamMembers();
    } catch (error) {
      showError("Erro ao alterar status");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      position: "",
      description: "",
      image: "",
      email: "",
      active: true
    });
    setEditingMember(null);
    setShowForm(false);
  };

  // Filtros e ordenação
  const filteredAndSortedMembers = teamMembers
    .filter(member => {
      // Filtro de busca
      const matchesSearch = 
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filtro de status
      const matchesFilter = 
        filterBy === 'all' ? true :
        filterBy === 'active' ? member.active :
        !member.active;
      
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'position':
          comparison = a.position.localeCompare(b.position);
          break;
        case 'created':
          comparison = new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
          break;
        case 'updated':
          comparison = new Date(a.updatedAt || 0).getTime() - new Date(b.updatedAt || 0).getTime();
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const activeMembers = teamMembers.filter(m => m.active).length;
  const totalMembers = teamMembers.length;

  if (loading) {
    return (
      <PageShell title="Gerenciar Equipe" loading={true}>
        <div>Carregando...</div>
      </PageShell>
    );
  }

  return (
    <PageShell
      title="Gerenciar Equipe"
      subtitle={`${totalMembers} membros • ${activeMembers} ativos`}
      maxWidth="7xl"
    >
      {/* Toolbar */}
      <div className="mb-6 space-y-4">
        {/* Linha 1: Busca e Ações */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Busca */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Buscar por nome, cargo ou descrição..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Ações */}
          <div className="flex gap-2">
            <Button onClick={() => setShowForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Membro
            </Button>
          </div>
        </div>

        {/* Linha 2: Filtros e Visualização */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          {/* Filtros */}
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

            {/* Ordenação */}
            <Select value={sortBy} onValueChange={(value: SortBy) => setSortBy(value)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Nome</SelectItem>
                <SelectItem value="position">Cargo</SelectItem>
                <SelectItem value="created">Criação</SelectItem>
                <SelectItem value="updated">Atualização</SelectItem>
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

      {/* Form Modal */}
      {showForm && (
        <Card className="mb-8" style={{
          backgroundColor: 'var(--panel-bg)',
          borderColor: 'var(--border-color)'
        }}>
          <CardHeader>
            <CardTitle style={{ color: 'var(--site-text-color)' }}>
              {editingMember ? "Editar Membro" : "Novo Membro"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Ex: Dr. João Silva"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Cargo/Posição *</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => setFormData({...formData, position: e.target.value})}
                    placeholder="Ex: Advogado Sênior"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Descreva a experiência..."
                  rows={4}
                  required
                />
              </div>

              <ImageUpload
                value={formData.image}
                onChange={(url) => setFormData({...formData, image: url})}
                onRemove={() => setFormData({...formData, image: ""})}
              />

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="email@exemplo.com"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={formData.active}
                  onCheckedChange={(checked) => setFormData({...formData, active: checked})}
                />
                <Label htmlFor="active">Ativo na homepage</Label>
              </div>

              <div className="flex space-x-4">
                <Button type="submit">
                  {editingMember ? "Atualizar" : "Criar"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Members Display */}
      {viewMode === 'grid' ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedMembers.map((member) => (
            <Card key={member.id} className="relative group hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="absolute top-4 right-4">
                  <Badge variant={member.active ? "default" : "secondary"}>
                    {member.active ? "Ativo" : "Inativo"}
                  </Badge>
                </div>

                <div className="flex justify-center mb-4">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full object-cover border-2 border-primary/20"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center border-2 border-primary/20">
                      <User className="w-12 h-12 text-primary" />
                    </div>
                  )}
                </div>

                <div className="text-center mb-4">
                  <h3 className="font-bold text-lg mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-primary font-medium mb-2">
                    {member.position}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {member.description}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(member)}
                    className="flex-1"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleToggleActive(member)}
                  >
                    {member.active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(member)}
                    className="text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAndSortedMembers.map((member) => (
            <Card key={member.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-6">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-primary" />
                    </div>
                  )}

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold text-lg">{member.name}</h3>
                      <Badge variant={member.active ? "default" : "secondary"}>
                        {member.active ? "Ativo" : "Inativo"}
                      </Badge>
                    </div>
                    <p className="text-sm text-primary font-medium mb-2">{member.position}</p>
                    <p className="text-sm text-muted-foreground line-clamp-2">{member.description}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(member)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleToggleActive(member)}>
                      {member.active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(member)} className="text-red-600">
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
      {filteredAndSortedMembers.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">
            Nenhum membro encontrado
          </h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm ? "Tente ajustar sua busca" : "Comece adicionando o primeiro membro"}
          </p>
          {!showForm && (
            <Button onClick={() => setShowForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Primeiro Membro
            </Button>
          )}
        </div>
      )}
    </PageShell>
  );
};

export default AdminTeamEnhanced;
