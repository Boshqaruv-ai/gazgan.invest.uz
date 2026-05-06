import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../../app/app_theme.dart';
import '../../../data/mock_data.dart';
import '../../notifications/notifications_sheet.dart';
import '../home_data.dart';

class HeroSection extends StatelessWidget {
  const HeroSection({super.key});

  @override
  Widget build(BuildContext context) {
    final textScale = MediaQuery.textScalerOf(context).scale(1);
    final heroHeight = 646 + ((textScale - 1) * 90).clamp(0, 54);

    return SizedBox(
      height: heroHeight.toDouble(),
      child: Stack(
        fit: StackFit.expand,
        children: [
          ClipRRect(
            borderRadius: const BorderRadius.only(
              bottomLeft: Radius.circular(34),
              bottomRight: Radius.circular(34),
            ),
            child: Image.asset(
              heroImage,
              fit: BoxFit.cover,
              errorBuilder: (context, error, stack) => Container(
                color: GazganColors.surface,
                child: const Center(
                  child: Icon(
                    Icons.landscape,
                    color: GazganColors.gold,
                    size: 64,
                  ),
                ),
              ),
            ),
          ),
          DecoratedBox(
            decoration: BoxDecoration(
              borderRadius: const BorderRadius.only(
                bottomLeft: Radius.circular(34),
                bottomRight: Radius.circular(34),
              ),
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [
                  GazganColors.graphite.withValues(alpha: 0.28),
                  GazganColors.graphite.withValues(alpha: 0.56),
                  GazganColors.graphite.withValues(alpha: 0.98),
                ],
                stops: const [0, 0.48, 1],
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.fromLTRB(12, 12, 12, 22),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const _TopHeader(),
                const Spacer(),
                const _HeroCopy(),
                const SizedBox(height: 20),
                Wrap(
                  spacing: 12,
                  runSpacing: 10,
                  children: [
                    _HeroButton(
                      label: 'Investitsiya qilish',
                      icon: Icons.arrow_forward_rounded,
                      filled: true,
                      onTap: () => context.go('/projects'),
                    ),
                    _HeroButton(
                      label: "Katalogni ko'rish",
                      icon: Icons.inventory_2_outlined,
                      onTap: () => context.go('/products'),
                    ),
                  ],
                ),
                const SizedBox(height: 20),
                const _BenefitsRow(),
                const SizedBox(height: 18),
                const Row(
                  children: [
                    Expanded(child: _PagerDots()),
                    SizedBox(width: 14),
                    Expanded(child: _VideoPreviewCard()),
                  ],
                ),
                const SizedBox(height: 6),
                const Center(child: _ScrollCue()),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _TopHeader extends StatelessWidget {
  const _TopHeader();

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        const _BrandLogo(),
        const Spacer(),
        _HeaderButton(
          icon: Icons.notifications_none_rounded,
          badge: true,
          onTap: () => showNotificationsSheet(context: context),
        ),
      ],
    );
  }
}

class _BrandLogo extends StatelessWidget {
  const _BrandLogo();

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Container(
          width: 58,
          height: 58,
          padding: const EdgeInsets.all(3),
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            border: Border.all(color: GazganColors.gold, width: 1.4),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withValues(alpha: 0.38),
                blurRadius: 18,
                offset: const Offset(0, 8),
              ),
            ],
          ),
          child: ClipOval(
            child: Image.asset(gazganLogoImage, fit: BoxFit.cover),
          ),
        ),
        const SizedBox(width: 10),
        const Text(
          "G'OZG'ON\nINVEST",
          style: TextStyle(
            color: GazganColors.copy,
            fontSize: 16,
            height: 0.95,
            fontWeight: FontWeight.w900,
            letterSpacing: 0.2,
          ),
        ),
      ],
    );
  }
}

class _HeaderButton extends StatelessWidget {
  const _HeaderButton({
    required this.icon,
    required this.onTap,
    this.badge = false,
  });

  final IconData icon;
  final VoidCallback onTap;
  final bool badge;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      borderRadius: BorderRadius.circular(17),
      onTap: onTap,
      child: Container(
        width: 52,
        height: 52,
        decoration: BoxDecoration(
          color: GazganColors.graphite.withValues(alpha: 0.72),
          borderRadius: BorderRadius.circular(17),
          border: Border.all(
            color: badge
                ? GazganColors.line
                : GazganColors.gold.withValues(alpha: 0.44),
          ),
        ),
        child: Stack(
          alignment: Alignment.center,
          children: [
            Icon(icon, color: GazganColors.copy, size: 28),
            if (badge)
              Positioned(
                right: 11,
                top: 10,
                child: Container(
                  width: 15,
                  height: 15,
                  decoration: const BoxDecoration(
                    color: GazganColors.gold,
                    shape: BoxShape.circle,
                  ),
                  child: const Center(
                    child: Text(
                      '1',
                      style: TextStyle(
                        color: GazganColors.graphite,
                        fontSize: 9,
                        fontWeight: FontWeight.w900,
                      ),
                    ),
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}

class _HeroCopy extends StatelessWidget {
  const _HeroCopy();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        RichText(
          text: TextSpan(
            style: Theme.of(context).textTheme.headlineLarge?.copyWith(
              fontSize: 40,
              height: 1.06,
              fontWeight: FontWeight.w900,
              color: GazganColors.copy,
            ),
            children: const [
              TextSpan(text: "G'ozg'on -\n"),
              TextSpan(
                text: 'marmar va granit\n',
                style: TextStyle(color: GazganColors.gold),
              ),
              TextSpan(text: 'yuragi'),
            ],
          ),
        ),
        const SizedBox(height: 16),
        Text(
          'Yuqori sifatli tabiiy toshlar va foydali investitsiya imkoniyatlari.',
          style: Theme.of(context).textTheme.bodyLarge?.copyWith(
            color: GazganColors.copy.withValues(alpha: 0.76),
            fontSize: 17,
            height: 1.42,
          ),
        ),
      ],
    );
  }
}

class _HeroButton extends StatelessWidget {
  const _HeroButton({
    required this.label,
    required this.icon,
    required this.onTap,
    this.filled = false,
  });

  final String label;
  final IconData icon;
  final VoidCallback onTap;
  final bool filled;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      borderRadius: BorderRadius.circular(14),
      onTap: onTap,
      child: Container(
        height: 54,
        constraints: const BoxConstraints(minWidth: 154),
        padding: const EdgeInsets.symmetric(horizontal: 18),
        decoration: BoxDecoration(
          color: filled
              ? GazganColors.gold
              : GazganColors.graphite.withValues(alpha: 0.42),
          borderRadius: BorderRadius.circular(14),
          border: Border.all(
            color: GazganColors.gold.withValues(alpha: filled ? 0 : 0.64),
          ),
          boxShadow: filled
              ? [
                  BoxShadow(
                    color: GazganColors.gold.withValues(alpha: 0.22),
                    blurRadius: 22,
                    offset: const Offset(0, 10),
                  ),
                ]
              : null,
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            if (!filled) Icon(icon, size: 17, color: GazganColors.gold),
            if (!filled) const SizedBox(width: 9),
            Text(
              label,
              style: TextStyle(
                color: filled ? GazganColors.graphite : GazganColors.copy,
                fontWeight: FontWeight.w900,
                fontSize: 15,
              ),
            ),
            if (filled) ...[
              const SizedBox(width: 12),
              Icon(icon, color: GazganColors.graphite, size: 22),
            ],
          ],
        ),
      ),
    );
  }
}

class _BenefitsRow extends StatelessWidget {
  const _BenefitsRow();

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        for (final benefit in homeBenefits)
          Expanded(child: _BenefitItem(title: benefit.title)),
      ],
    );
  }
}

class _BenefitItem extends StatelessWidget {
  const _BenefitItem({required this.title});

  final String title;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(right: 8),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: 28,
            height: 28,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              border: Border.all(color: GazganColors.gold),
            ),
            child: const Icon(
              Icons.verified_user_outlined,
              color: GazganColors.gold,
              size: 16,
            ),
          ),
          const SizedBox(width: 7),
          Expanded(
            child: Text(
              title,
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                color: GazganColors.copy,
                fontSize: 11,
                height: 1.22,
                fontWeight: FontWeight.w700,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _VideoPreviewCard extends StatelessWidget {
  const _VideoPreviewCard();

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 88,
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: GazganColors.graphite.withValues(alpha: 0.68),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: Colors.white.withValues(alpha: 0.18)),
      ),
      child: Row(
        children: [
          Container(
            width: 48,
            height: 48,
            decoration: const BoxDecoration(
              shape: BoxShape.circle,
              gradient: LinearGradient(
                colors: [GazganColors.gold, GazganColors.goldDeep],
              ),
            ),
            child: const Icon(
              Icons.play_arrow_rounded,
              color: Colors.white,
              size: 30,
            ),
          ),
          const SizedBox(width: 11),
          Expanded(
            child: Text(
              "G'ozg'on haqida video tomosha qiling\n2:45 daqiqa",
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                color: GazganColors.copy,
                fontWeight: FontWeight.w800,
                height: 1.35,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _PagerDots extends StatelessWidget {
  const _PagerDots();

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Container(
          width: 18,
          height: 7,
          decoration: BoxDecoration(
            color: GazganColors.gold,
            borderRadius: BorderRadius.circular(99),
          ),
        ),
        const SizedBox(width: 8),
        for (var i = 0; i < 2; i++) ...[
          Container(
            width: 8,
            height: 8,
            decoration: BoxDecoration(
              color: GazganColors.copy.withValues(alpha: 0.3),
              shape: BoxShape.circle,
            ),
          ),
          if (i == 0) const SizedBox(width: 8),
        ],
      ],
    );
  }
}

class _ScrollCue extends StatelessWidget {
  const _ScrollCue();

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 48,
      height: 48,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        color: GazganColors.graphite.withValues(alpha: 0.58),
        border: Border.all(color: GazganColors.gold.withValues(alpha: 0.35)),
      ),
      child: const Icon(
        Icons.keyboard_arrow_down_rounded,
        color: GazganColors.gold,
      ),
    );
  }
}
