import 'package:flutter/material.dart';

import '../app/app_theme.dart';

class ScreenFrame extends StatelessWidget {
  const ScreenFrame({
    required this.title,
    required this.child,
    this.subtitle,
    this.onRefresh,
    super.key,
  });

  final String title;
  final String? subtitle;
  final Widget child;
  final Future<void> Function()? onRefresh;

  @override
  Widget build(BuildContext context) {
    final body = ListView(
      physics: onRefresh != null
          ? const AlwaysScrollableScrollPhysics(
              parent: BouncingScrollPhysics(),
            )
          : null,
      padding: const EdgeInsets.fromLTRB(18, 8, 18, 28),
      children: [
        if (subtitle != null) ...[
          Text(
            subtitle!,
            style: Theme.of(context)
                .textTheme
                .bodyMedium
                ?.copyWith(color: GazganColors.muted),
          ),
          const SizedBox(height: 18),
        ],
        child,
      ],
    );

    return Scaffold(
      appBar: AppBar(title: Text(title)),
      body: SafeArea(
        top: false,
        child: onRefresh != null
            ? RefreshIndicator(
                onRefresh: onRefresh!,
                color: GazganColors.gold,
                backgroundColor: GazganColors.surface,
                child: body,
              )
            : body,
      ),
    );
  }
}
