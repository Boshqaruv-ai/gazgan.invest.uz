import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../app/app_theme.dart';
import '../../features/chat/ai_chat_sheet.dart';
import '../../features/leads/lead_form_sheet.dart';
import '../../models/featured_product.dart';
import '../../models/project.dart';
import '../../repositories/featured_products_repository.dart';
import '../../repositories/projects_repository.dart';
import '../../widgets/state_views.dart';
import 'home_data.dart';
import 'widgets/cta_card.dart';
import 'widgets/hero_section.dart';
import 'widgets/home_product_card.dart';
import 'widgets/home_project_card.dart';
import 'widgets/section_header.dart';
import 'widgets/stats_card.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({
    this.projectsRepository = const ProjectsRepository(),
    this.productsRepository = const FeaturedProductsRepository(),
    super.key,
  });

  final ProjectsRepository projectsRepository;
  final FeaturedProductsRepository productsRepository;

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  late Future<_HomeData> futureData;

  @override
  void initState() {
    super.initState();
    futureData = _load();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: GazganColors.graphite,
      body: SafeArea(
        child: Stack(
          children: [
            RefreshIndicator(
              onRefresh: () async {
                await _reloadAsync();
              },
              color: GazganColors.gold,
              backgroundColor: GazganColors.surface,
              child: SingleChildScrollView(
              physics: const AlwaysScrollableScrollPhysics(
                parent: BouncingScrollPhysics(),
              ),
              padding: const EdgeInsets.fromLTRB(14, 0, 14, 28),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const HeroSection(),
                  const SizedBox(height: 18),
                  const StatsCard(stats: homeStats),
                  const SizedBox(height: 24),
                  FutureBuilder<_HomeData>(
                    future: futureData,
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

                      final data = snapshot.data ?? const _HomeData();
                      return Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          SectionHeader(
                            title: 'Qaynoq investitsiya loyihalari',
                            action: 'Barchasi',
                            onTap: () => context.go('/projects'),
                          ),
                          const SizedBox(height: 12),
                          if (data.projects.isEmpty)
                            const EmptyStateView(
                              title: 'Loyihalar yoʻq',
                              message:
                                  'Hozircha faol investitsiya loyihalari topilmadi.',
                            )
                          else
                            SizedBox(
                              height: 310,
                              child: ListView.separated(
                                scrollDirection: Axis.horizontal,
                                physics: const BouncingScrollPhysics(),
                                itemCount: data.projects.length,
                                separatorBuilder: (context, index) =>
                                    const SizedBox(width: 14),
                                itemBuilder: (context, index) {
                                  final project = data.projects[index];
                                  return HomeProjectCard(
                                    project: project,
                                    onTap: () =>
                                        context.go('/projects/${project.id}'),
                                  );
                                },
                              ),
                            ),
                          const SizedBox(height: 28),
                          SectionHeader(
                            title: 'Tanlangan mahsulotlar',
                            action: 'Barchasi',
                            onTap: () => context.go('/products'),
                          ),
                          const SizedBox(height: 12),
                          if (data.products.isEmpty)
                            const EmptyStateView(
                              title: 'Mahsulotlar yoʻq',
                              message:
                                  'Hozircha faol katalog mahsulotlari topilmadi.',
                            )
                          else
                            SizedBox(
                              height: 220,
                              child: ListView.separated(
                                scrollDirection: Axis.horizontal,
                                physics: const BouncingScrollPhysics(),
                                itemCount: data.products.length,
                                separatorBuilder: (context, index) =>
                                    const SizedBox(width: 14),
                                itemBuilder: (context, index) {
                                  final product = data.products[index];
                                  return HomeProductCard(
                                    product: product,
                                    onTap: () =>
                                        context.go('/products/${product.id}'),
                                  );
                                },
                              ),
                            ),
                        ],
                      );
                    },
                  ),
                  const SizedBox(height: 24),
                  CtaCard(
                    onContactTap: () => showLeadFormSheet(
                      context: context,
                      title: 'Konsultatsiya soʻrovi',
                      projectId: 'general',
                    ),
                  ),
                  const SizedBox(height: 18),
                ],
              ),
            ),
            ),
            const Positioned(right: 2, bottom: 18, child: _FloatingAiButton()),
          ],
        ),
      ),
    );
  }

  Future<_HomeData> _load() async {
    final results = await Future.wait([
      widget.projectsRepository.listProjects(),
      widget.productsRepository.listFeaturedProducts(),
    ]);
    return _HomeData(
      projects: (results[0] as List<Project>).take(4).toList(),
      products: (results[1] as List<FeaturedProduct>).take(4).toList(),
    );
  }

  void _reload() {
    setState(() {
      futureData = _load();
    });
  }

  Future<void> _reloadAsync() async {
    final data = _load();
    setState(() {
      futureData = data;
    });
    await data;
  }
}

class _HomeData {
  const _HomeData({this.projects = const [], this.products = const []});

  final List<Project> projects;
  final List<FeaturedProduct> products;
}

class _FloatingAiButton extends StatelessWidget {
  const _FloatingAiButton();

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => showAiChatSheet(context: context),
      child: Container(
        width: 72,
        height: 72,
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          gradient: const LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [GazganColors.gold, GazganColors.goldDeep],
          ),
          boxShadow: [
            BoxShadow(
              color: GazganColors.gold.withValues(alpha: 0.32),
              blurRadius: 26,
              offset: const Offset(0, 12),
            ),
          ],
          border: Border.all(color: Colors.white.withValues(alpha: 0.16)),
        ),
        child: Stack(
          clipBehavior: Clip.none,
          children: [
            const Center(
              child: Icon(
                Icons.smart_toy_rounded,
                color: GazganColors.graphite,
                size: 30,
              ),
            ),
            Positioned(
              right: 6,
              top: 8,
              child: Container(
                width: 14,
                height: 14,
                decoration: const BoxDecoration(
                  color: GazganColors.success,
                  shape: BoxShape.circle,
                ),
                child: const Icon(
                  Icons.bolt_rounded,
                  color: GazganColors.graphite,
                  size: 8,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
