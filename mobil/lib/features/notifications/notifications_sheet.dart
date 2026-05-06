import 'package:flutter/material.dart';

import '../../app/app_theme.dart';
import '../../core/supabase_client.dart';

Future<void> showNotificationsSheet({required BuildContext context}) {
  return showModalBottomSheet<void>(
    context: context,
    isScrollControlled: true,
    backgroundColor: GazganColors.graphiteSoft,
    shape: const RoundedRectangleBorder(
      borderRadius: BorderRadius.vertical(top: Radius.circular(26)),
    ),
    builder: (context) => const _NotificationsSheet(),
  );
}

class _NotificationsSheet extends StatefulWidget {
  const _NotificationsSheet();

  @override
  State<_NotificationsSheet> createState() => _NotificationsSheetState();
}

class _NotificationsSheetState extends State<_NotificationsSheet> {
  late Future<List<_Notification>> futureNotifications;

  @override
  void initState() {
    super.initState();
    futureNotifications = _fetchNotifications();
  }

  Future<List<_Notification>> _fetchNotifications() async {
    if (!AppSupabase.isConfigured) {
      return _mockNotifications;
    }
    try {
      final rows = await AppSupabase.client
          .from('notifications')
          .select()
          .isFilter('telegram_id', null)
          .order('created_at', ascending: false)
          .limit(20);
      return rows
          .map((r) => _Notification(
                title: r['title']?.toString() ?? '',
                body: r['body']?.toString() ?? '',
                createdAt: r['created_at']?.toString() ?? '',
              ))
          .toList();
    } catch (_) {
      return _mockNotifications;
    }
  }

  @override
  Widget build(BuildContext context) {
    final bottomPadding = MediaQuery.of(context).viewInsets.bottom;

    return Padding(
      padding: EdgeInsets.fromLTRB(0, 18, 0, bottomPadding),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 18),
            child: Row(
              children: [
                Container(
                  width: 38,
                  height: 38,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    gradient: const LinearGradient(
                      colors: [GazganColors.gold, GazganColors.goldDeep],
                    ),
                    boxShadow: [
                      BoxShadow(
                        color: GazganColors.gold.withValues(alpha: 0.32),
                        blurRadius: 12,
                        offset: const Offset(0, 6),
                      ),
                    ],
                  ),
                  child: const Icon(
                    Icons.notifications_rounded,
                    color: GazganColors.graphite,
                    size: 18,
                  ),
                ),
                const SizedBox(width: 12),
                const Expanded(
                  child: Text(
                    'Bildirishnomalar',
                    style: TextStyle(
                      color: GazganColors.copy,
                      fontSize: 18,
                      fontWeight: FontWeight.w800,
                    ),
                  ),
                ),
                IconButton(
                  onPressed: () => Navigator.pop(context),
                  icon: const Icon(Icons.close_rounded, color: GazganColors.copy),
                ),
              ],
            ),
          ),
          const SizedBox(height: 8),
          SizedBox(
            height: MediaQuery.of(context).size.height * 0.55,
            child: FutureBuilder<List<_Notification>>(
              future: futureNotifications,
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const Center(
                    child: CircularProgressIndicator(color: GazganColors.gold),
                  );
                }
                final items = snapshot.data ?? [];
                if (items.isEmpty) {
                  return const Center(
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(Icons.inbox_rounded, color: GazganColors.muted, size: 40),
                        SizedBox(height: 10),
                        Text(
                          'Hozircha bildirishnomalar yoq',
                          style: TextStyle(color: GazganColors.muted),
                        ),
                      ],
                    ),
                  );
                }
                return ListView.builder(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  itemCount: items.length,
                  itemBuilder: (context, index) {
                    final item = items[index];
                    return Container(
                      margin: const EdgeInsets.only(bottom: 10),
                      padding: const EdgeInsets.all(14),
                      decoration: BoxDecoration(
                        color: GazganColors.surface,
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(color: GazganColors.line),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            item.title,
                            style: const TextStyle(
                              color: GazganColors.copy,
                              fontWeight: FontWeight.w700,
                              fontSize: 14,
                            ),
                          ),
                          if (item.body.isNotEmpty) ...[
                            const SizedBox(height: 6),
                            Text(
                              item.body,
                              style: const TextStyle(
                                color: GazganColors.muted,
                                fontSize: 13,
                                height: 1.4,
                              ),
                            ),
                          ],
                          const SizedBox(height: 8),
                          Text(
                            item.createdAt,
                            style: const TextStyle(
                              color: GazganColors.muted,
                              fontSize: 11,
                            ),
                          ),
                        ],
                      ),
                    );
                  },
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

class _Notification {
  const _Notification({
    required this.title,
    required this.body,
    required this.createdAt,
  });
  final String title;
  final String body;
  final String createdAt;
}

const _mockNotifications = <_Notification>[
  _Notification(
    title: 'Yangi loyiha qoshildi',
    body: 'Oq marmar koni investitsiya loyihasi endi faol. Batafsil korish uchun Loyihalar bolimiga oting.',
    createdAt: '2026-05-06 10:30',
  ),
  _Notification(
    title: 'Mahsulotlar katalogi yangilandi',
    body: 'Granit va marmar mahsulotlariga yangi narxlar qoshildi.',
    createdAt: '2026-05-05 14:15',
  ),
];
