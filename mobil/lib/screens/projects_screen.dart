import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../app/app_theme.dart';
import '../models/project.dart';
import '../repositories/projects_repository.dart';
import '../widgets/project_card.dart';
import '../widgets/screen_frame.dart';
import '../widgets/state_views.dart';

class ProjectsScreen extends StatefulWidget {
  const ProjectsScreen({
    this.repository = const ProjectsRepository(),
    super.key,
  });

  final ProjectsRepository repository;

  @override
  State<ProjectsScreen> createState() => _ProjectsScreenState();
}

class _ProjectsScreenState extends State<ProjectsScreen> {
  ProjectStatus? selectedStatus;
  late Future<List<Project>> futureProjects;

  @override
  void initState() {
    super.initState();
    futureProjects = widget.repository.listProjects();
  }

  @override
  Widget build(BuildContext context) {
    return ScreenFrame(
      title: 'Loyihalar',
      subtitle:
          "ROI, qoplanish muddati va yig'ilgan investitsiya bo'yicha solishtiring.",
      child: RefreshIndicator(
        onRefresh: () async {
          await _reloadAsync();
        },
        color: GazganColors.gold,
        backgroundColor: GazganColors.surface,
        child: FutureBuilder<List<Project>>(
        future: futureProjects,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const LoadingStateView();
          }
          if (snapshot.hasError) {
            return ErrorStateView(
              message: snapshot.error.toString(),
              onRetry: _reload,
            );
          }

          final allProjects = snapshot.data ?? [];
          final projects = selectedStatus == null
              ? allProjects
              : allProjects
                    .where((project) => project.status == selectedStatus)
                    .toList();

          return ListView(
            physics: const AlwaysScrollableScrollPhysics(
              parent: BouncingScrollPhysics(),
            ),
            children: [
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(
                  children: [
                    _FilterChip(
                      label: 'Hammasi',
                      selected: selectedStatus == null,
                      onTap: () => setState(() => selectedStatus = null),
                    ),
                    for (final status in ProjectStatus.values)
                      _FilterChip(
                        label: status.label,
                        selected: selectedStatus == status,
                        onTap: () => setState(() => selectedStatus = status),
                      ),
                  ],
                ),
              ),
              const SizedBox(height: 16),
              if (projects.isEmpty)
                const EmptyStateView(
                  title: 'Loyiha topilmadi',
                  message:
                      'Tanlangan filter bo\'yicha faol investitsiya loyihasi yo\'q.',
                )
              else
                for (final project in projects)
                  ProjectCard(
                    project: project,
                    onTap: () => context.go('/projects/${project.id}'),
                  ),
            ],
          );
        },
      ),
      ),
    );
  }

  void _reload() {
    setState(() {
      futureProjects = widget.repository.listProjects();
    });
  }

  Future<void> _reloadAsync() async {
    final data = widget.repository.listProjects();
    setState(() {
      futureProjects = data;
    });
    await data;
  }
}

class _FilterChip extends StatelessWidget {
  const _FilterChip({
    required this.label,
    required this.selected,
    required this.onTap,
  });

  final String label;
  final bool selected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(right: 8),
      child: ChoiceChip(
        label: Text(label),
        selected: selected,
        onSelected: (_) => onTap(),
        selectedColor: GazganColors.gold,
        backgroundColor: GazganColors.surface,
        labelStyle: TextStyle(
          color: selected ? GazganColors.graphite : GazganColors.copy,
          fontWeight: FontWeight.w700,
        ),
        side: const BorderSide(color: GazganColors.line),
      ),
    );
  }
}
