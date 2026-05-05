import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../app/app_theme.dart';
import '../models/featured_product.dart';
import '../repositories/featured_products_repository.dart';
import '../widgets/product_card.dart';
import '../widgets/screen_frame.dart';
import '../widgets/state_views.dart';

class ProductsScreen extends StatefulWidget {
  const ProductsScreen({
    this.repository = const FeaturedProductsRepository(),
    super.key,
  });

  final FeaturedProductsRepository repository;

  @override
  State<ProductsScreen> createState() => _ProductsScreenState();
}

class _ProductsScreenState extends State<ProductsScreen> {
  late Future<List<FeaturedProduct>> futureProducts;

  @override
  void initState() {
    super.initState();
    futureProducts = widget.repository.listFeaturedProducts();
  }

  @override
  Widget build(BuildContext context) {
    return ScreenFrame(
      title: 'Mahsulotlar',
      subtitle:
          'Admin panel orqali yangilanadigan marmar va granit katalogi uchun UI maket.',
      child: RefreshIndicator(
        onRefresh: () async {
          await _reloadAsync();
        },
        color: GazganColors.gold,
        backgroundColor: GazganColors.surface,
        child: ListView(
          physics: const AlwaysScrollableScrollPhysics(
            parent: BouncingScrollPhysics(),
          ),
          children: [
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(18),
            decoration: BoxDecoration(
              color: GazganColors.marble,
              borderRadius: BorderRadius.circular(22),
            ),
            child: const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Icon(Icons.diamond_rounded, color: GazganColors.goldDeep),
                SizedBox(height: 12),
                Text(
                  'Premium katalog',
                  style: TextStyle(
                    color: GazganColors.graphite,
                    fontSize: 21,
                    fontWeight: FontWeight.w800,
                  ),
                ),
                SizedBox(height: 6),
                Text(
                  "Narx, birlik va kategoriya Supabase contractiga mos ko'rsatiladi.",
                  style: TextStyle(color: Color(0xFF4C5563), height: 1.4),
                ),
              ],
            ),
          ),
          const SizedBox(height: 18),
          FutureBuilder(
            future: futureProducts,
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

              final products = snapshot.data ?? [];
              if (products.isEmpty) {
                return const EmptyStateView(
                  title: 'Mahsulot topilmadi',
                  message: 'Hozircha faol katalog mahsulotlari yo\u02bbq.',
                );
              }

              return Column(
                children: [
                  for (final product in products)
                    ProductCard(
                      product: product,
                      onTap: () => context.go('/products/${product.id}'),
                    ),
                ],
              );
            },
          ),
        ],
      ),
      ),
    );
  }

  void _reload() {
    setState(() {
      futureProducts = widget.repository.listFeaturedProducts();
    });
  }

  Future<void> _reloadAsync() async {
    final data = widget.repository.listFeaturedProducts();
    setState(() {
      futureProducts = data;
    });
    await data;
  }
}
