import { useParams, useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { useProjects } from '@/hooks/useProjects';
import { useTasks } from '@/hooks/useTasks';
import { TaskList } from '@/features/tasks/components/TaskList';
import { TaskModal } from '@/features/tasks/components/TaskModal';
import { DeleteTaskDialog } from '@/features/tasks/components/DeleteTaskDialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, ArrowLeft, Settings2, Search } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Task } from '@/lib/types';
import { slugify } from '@/lib/utils';

const ProjectDetail = () => {
  const { projectId: projectSlug } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: projects, isLoading: isLoadingProjects } = useProjects();
  
  const project = useMemo(() => {
    if (!projects || !projectSlug) return null;
    return projects.find(p => slugify(p.name) === projectSlug);
  }, [projects, projectSlug]);
  
  const projectId = project?.id;
  const { data: tasks, isLoading: isLoadingTasks } = useTasks(projectId);
  const isLoadingProject = isLoadingProjects;

  if (!projectSlug) {
    return (
      <AppLayout>
        <div className="max-w-6xl space-y-4">
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">Invalid project</p>
            <Button onClick={() => navigate('/')} className="mt-4">
              Go to Dashboard
            </Button>
          </Card>
        </div>
      </AppLayout>
    );
  }

  const stats = {
    total: tasks?.length ?? 0,
    todo: tasks?.filter(t => t.status === 'todo').length ?? 0,
    inProgress: tasks?.filter(t => t.status === 'in_progress').length ?? 0,
    completed: tasks?.filter(t => t.status === 'completed').length ?? 0,
    blocked: tasks?.filter(t => t.status === 'blocked').length ?? 0,
  };

  const filteredTasks = tasks?.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const handleDelete = (task: Task) => {
    setDeletingTask(task);
  };

  const handleCloseModal = () => {
    setIsTaskModalOpen(false);
    setEditingTask(null);
  };

  return (
    <AppLayout>
      <div className="max-w-6xl space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="hover:bg-accent"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            {isLoadingProject ? (
              <div className="space-y-2">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-96" />
              </div>
            ) : project ? (
              <div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: project.color }}
                  />
                  <h1 className="text-2xl font-semibold text-foreground">
                    {project.name}
                  </h1>
                </div>
                {project.description && (
                  <p className="text-muted-foreground mt-1">{project.description}</p>
                )}
              </div>
            ) : (
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Project Not Found</h1>
                <p className="text-muted-foreground mt-1">
                  The project you're looking for doesn't exist or you don't have access to it.
                </p>
              </div>
            )}
          </div>
          <div className="flex gap-2">

            <Button onClick={() => setIsTaskModalOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Task
            </Button>
          </div>
        </div>

        {/* Stats */}
        {!isLoadingProject && project && (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            <Card className="p-4">
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-2xl font-semibold mt-1">{stats.total}</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-muted-foreground">To Do</p>
              <p className="text-2xl font-semibold mt-1">{stats.todo}</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-muted-foreground">In Progress</p>
              <p className="text-2xl font-semibold mt-1">{stats.inProgress}</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-2xl font-semibold mt-1">{stats.completed}</p>
            </Card>
          </div>
        )}

        {/* Tasks */}
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-medium text-foreground">Tasks</h2>
            {tasks && tasks.length > 0 && (
              <p className="text-sm text-muted-foreground">
                {stats.completed} of {stats.total} completed
              </p>
            )}
          </div>

          {/* Search */}
          {tasks && tasks.length > 0 && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          )}

          {isLoadingTasks ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="p-4">
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </Card>
              ))}
            </div>
          ) : (
            <TaskList
              tasks={filteredTasks}
              onEdit={handleEdit}
              onDelete={handleDelete}
              emptyMessage={searchQuery ? "No tasks match your search." : "No tasks yet. Create your first task for this project."}
            />
          )}
        </div>

        {/* Task Modal */}
        {project && (
          <TaskModal
            isOpen={isTaskModalOpen}
            onClose={handleCloseModal}
            task={editingTask}
            projectId={projectId}
            defaultProjectId={projectId}
          />
        )}

        {/* Delete Dialog */}
        <DeleteTaskDialog
          task={deletingTask}
          onClose={() => setDeletingTask(null)}
        />
      </div>
    </AppLayout>
  );
};

export default ProjectDetail;
