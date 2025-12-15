import { CheckSquare, Clock, Target, TrendingUp, Plus, FolderKanban } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { TaskList } from '@/features/tasks/components/TaskList';
import { useTasks } from '@/hooks/useTasks';
import { useProjects } from '@/hooks/useProjects';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SkeletonStats, SkeletonList } from '@/components/ui/skeleton';
import { useNavigate } from 'react-router-dom';
import { slugify } from '@/lib/utils';

export function Dashboard() {
  const { data: tasks, isLoading } = useTasks();
  const { data: projects, isLoading: isLoadingProjects } = useProjects();
  const navigate = useNavigate();

  const stats = {
    total: tasks?.length ?? 0,
    inProgress: tasks?.filter(t => t.status === 'in_progress').length ?? 0,
    completed: tasks?.filter(t => t.status === 'completed').length ?? 0,
    highPriority: tasks?.filter(t => t.priority === 'high' || t.priority === 'urgent').length ?? 0,
  };

  const recentTasks = tasks?.slice(0, 5) ?? [];

  return (
    <div className="space-y-8 max-w-6xl animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Overview of your tasks and projects</p>
        </div>
        
      </div>

      {isLoading ? (
        <SkeletonStats count={4} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Tasks"
            value={stats.total}
            icon={CheckSquare}
            className="stagger-1"
          />
          <StatsCard
            title="In Progress"
            value={stats.inProgress}
            icon={Clock}
            className="stagger-2"
          />
          <StatsCard
            title="Completed"
            value={stats.completed}
            icon={Target}
            className="stagger-3"
          />
          <StatsCard
            title="High Priority"
            value={stats.highPriority}
            icon={TrendingUp}
            className="stagger-4"
          />
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-foreground">Your Projects</h2>
        </div>
        
        {isLoadingProjects ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-muted" />
                    <div className="h-5 w-32 bg-muted rounded" />
                  </div>
                  <div className="h-4 w-full bg-muted rounded" />
                  <div className="h-4 w-20 bg-muted rounded" />
                </div>
              </Card>
            ))}
          </div>
        ) : projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.slice(0, 6).map((project) => (
              <Card
                key={project.id}
                className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/projects/${slugify(project.name)}`)}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: project.color }}
                    />
                    <h3 className="font-medium text-foreground truncate">
                      {project.name}
                    </h3>
                  </div>
                  <FolderKanban className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                </div>
                {project.description && (
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                    {project.description}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
                  <CheckSquare className="h-4 w-4" />
                  <span>{project.taskCount} tasks</span>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center">
            <FolderKanban className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              No projects yet. Create your first project to organize your tasks.
            </p>
          </Card>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-foreground">Recent Tasks</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-muted-foreground hover:text-foreground"
            onClick={() => navigate('/tasks')}
          >
            View all
          </Button>
        </div>
        
        {isLoading ? (
          <SkeletonList count={3} />
        ) : (
          <TaskList 
            tasks={recentTasks}
            emptyMessage="No tasks yet. Create your first task to get started."
          />
        )}
      </div>
    </div>
  );
}
