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

class _FloatingAiButton extends StatefulWidget {
  const _FloatingAiButton();

  @override
  State<_FloatingAiButton> createState() => _FloatingAiButtonState();
}

class _FloatingAiButtonState extends State<_FloatingAiButton>
    with SingleTickerProviderStateMixin {
  late final AnimationController _pulse;
  late final Animation<double> _scale;

  @override
  void initState() {
    super.initState();
    _pulse = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1800),
    )..repeat(reverse: true);
    _scale = Tween<double>(begin: 0.92, end: 1.0).animate(
      CurvedAnimation(parent: _pulse, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _pulse.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => showAiChatSheet(context: context),
      child: AnimatedBuilder(
        animation: _scale,
        builder: (context, child) {
          return Transform.scale(
            scale: _scale.value,
            child: child,
          );
        },
        child: Container(
          width: 64,
          height: 64,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            gradient: const LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [Color(0xFF1E2A3A), Color(0xFF0F1923)],
            ),
            border: Border.all(
              color: GazganColors.gold.withValues(alpha: 0.45),
              width: 1.8,
            ),
            boxShadow: [
              BoxShadow(
                color: GazganColors.gold.withValues(alpha: 0.28),
                blurRadius: 28,
                offset: const Offset(0, 8),
              ),
              BoxShadow(
                color: GazganColors.gold.withValues(alpha: 0.12),
                blurRadius: 48,
                offset: const Offset(0, 0),
              ),
            ],
          ),
          child: Stack(
            clipBehavior: Clip.none,
            children: [
              // Robot face icon
              const Center(
                child: Padding(
                  padding: EdgeInsets.only(bottom: 1),
                  child: Icon(
                    Icons.smart_toy_rounded,
                    color: GazganColors.gold,
                    size: 28,
                    shadows: [
                      Shadow(
                        color: Color(0x40E2B95E),
                        blurRadius: 14,
                      ),
                    ],
                  ),
                ),
              ),
              // Glowing online dot
              Positioned(
                right: -1,
                top: -1,
                child: Container(
                  width: 16,
                  height: 16,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: const Color(0xFF0F1923),
                    border: Border.all(
                      color: const Color(0xFF0F1923),
                      width: 2.5,
                    ),
                  ),
                  child: Center(
                    child: Container(
                      width: 9,
                      height: 9,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        gradient: const RadialGradient(
                          colors: [Color(0xFF5EFF8A), Color(0xFF2ECC71)],
                        ),
                        boxShadow: [
                          BoxShadow(
                            color: const Color(0xFF2ECC71).withValues(alpha: 0.7),
                            blurRadius: 8,
                            spreadRadius: 1,
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
              // Inner subtle highlight
              Positioned(
                left: 12,
                top: 10,
                child: Container(
                  width: 10,
                  height: 6,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(3),
                    gradient: LinearGradient(
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                      colors: [
                        Colors.white.withValues(alpha: 0.10),
                        Colors.white.withValues(alpha: 0.0),
                      ],
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
