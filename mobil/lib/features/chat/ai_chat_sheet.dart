import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';

import '../../app/app_theme.dart';

const _chatApiUrl = 'https://gazgan-invest.vercel.app/api/chat';

final _quickQuestions = [
  'Marmar nima?',
  'Investitsiya qanday qilinadi?',
  'Konlar qayerda?',
  'Mahsulotlar narxi qancha?',
];

Future<void> showAiChatSheet({required BuildContext context}) {
  return showModalBottomSheet<void>(
    context: context,
    isScrollControlled: true,
    backgroundColor: GazganColors.graphiteSoft,
    shape: const RoundedRectangleBorder(
      borderRadius: BorderRadius.vertical(top: Radius.circular(26)),
    ),
    builder: (context) => const _AiChatSheet(),
  );
}

class _AiChatSheet extends StatefulWidget {
  const _AiChatSheet();

  @override
  State<_AiChatSheet> createState() => _AiChatSheetState();
}

class _AiChatSheetState extends State<_AiChatSheet> {
  final _controller = TextEditingController();
  final _scrollController = ScrollController();
  final _messages = <_ChatMessage>[
    _ChatMessage(
      text: "Salom! Men G'ozg'on AI Konsultantiman.",
      isUser: false,
    ),
  ];
  var _loading = false;

  @override
  void dispose() {
    _controller.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  void _scrollToBottom() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scrollController.hasClients) {
        _scrollController.animateTo(
          _scrollController.position.maxScrollExtent,
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeOut,
        );
      }
    });
  }

  Future<void> _send(String text) async {
    if (text.trim().isEmpty || _loading) return;
    final message = text.trim();
    _controller.clear();

    setState(() {
      _messages.add(_ChatMessage(text: message, isUser: true));
      _loading = true;
    });
    _scrollToBottom();

    try {
      final history = _messages
          .sublist(0, _messages.length - 1)
          .map((m) => {'role': m.isUser ? 'user' : 'assistant', 'content': m.text})
          .toList();

      final client = HttpClient();
      client.connectionTimeout = const Duration(seconds: 15);
      final request = await client.postUrl(Uri.parse(_chatApiUrl));
      request.headers.set('Content-Type', 'application/json');
      request.write(jsonEncode({'message': message, 'history': history}));
      final response = await request.close();
      final body = await response.transform(utf8.decoder).join();
      final data = jsonDecode(body) as Map<String, dynamic>;
      client.close();

      final reply = data['response']?.toString() ?? 'Javob olishda xatolik.';
      if (!mounted) return;
      setState(() {
        _messages.add(_ChatMessage(text: reply, isUser: false));
        _loading = false;
      });
      _scrollToBottom();
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _messages.add(_ChatMessage(
          text: "Kechirasiz, hozir javob olishda xatolik yuz berdi.",
          isUser: false,
        ));
        _loading = false;
      });
      _scrollToBottom();
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
          // Header
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
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
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
                    Icons.chat_bubble_rounded,
                    color: GazganColors.graphite,
                    size: 18,
                  ),
                ),
                const SizedBox(width: 12),
                const Expanded(
                  child: Text(
                    'AI Konsultant',
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
          // Messages
          SizedBox(
            height: MediaQuery.of(context).size.height * 0.55,
            child: ListView.builder(
              controller: _scrollController,
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              itemCount: _messages.length + (_loading ? 1 : 0),
              itemBuilder: (context, index) {
                if (index == _messages.length) {
                  return const Padding(
                    padding: EdgeInsets.only(top: 8),
                    child: Align(
                      alignment: Alignment.centerLeft,
                      child: _TypingIndicator(),
                    ),
                  );
                }
                final msg = _messages[index];
                return _MessageBubble(message: msg);
              },
            ),
          ),
          // Quick questions
          Padding(
            padding: const EdgeInsets.fromLTRB(12, 8, 12, 4),
            child: Wrap(
              spacing: 6,
              runSpacing: 6,
              children: _quickQuestions.map((q) {
                return ActionChip(
                  label: Text(q, style: const TextStyle(fontSize: 11)),
                  backgroundColor: GazganColors.surface,
                  side: const BorderSide(color: GazganColors.line),
                  labelStyle: const TextStyle(color: GazganColors.muted),
                  onPressed: () => _send(q),
                );
              }).toList(),
            ),
          ),
          const SizedBox(height: 8),
          // Input row
          Padding(
            padding: const EdgeInsets.fromLTRB(12, 0, 12, 12),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _controller,
                    enabled: !_loading,
                    style: const TextStyle(color: GazganColors.copy),
                    decoration: InputDecoration(
                      hintText: 'Savol yozing...',
                      hintStyle: const TextStyle(color: GazganColors.muted),
                      filled: true,
                      fillColor: GazganColors.surface,
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(16),
                        borderSide: const BorderSide(color: GazganColors.line),
                      ),
                      enabledBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(16),
                        borderSide: const BorderSide(color: GazganColors.line),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(16),
                        borderSide: const BorderSide(color: GazganColors.gold),
                      ),
                      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                    ),
                    maxLines: 3,
                    minLines: 1,
                    textInputAction: TextInputAction.send,
                    onSubmitted: _send,
                  ),
                ),
                const SizedBox(width: 8),
                Container(
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    gradient: LinearGradient(
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                      colors: _loading
                          ? [GazganColors.surfaceLight, GazganColors.surfaceLight]
                          : [GazganColors.gold, GazganColors.goldDeep],
                    ),
                  ),
                  child: IconButton(
                    onPressed: _loading ? null : () => _send(_controller.text),
                    icon: _loading
                        ? const SizedBox(
                            width: 18,
                            height: 18,
                            child: CircularProgressIndicator(
                              strokeWidth: 2,
                              color: GazganColors.muted,
                            ),
                          )
                        : const Icon(Icons.send_rounded, color: GazganColors.graphite),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _ChatMessage {
  const _ChatMessage({required this.text, required this.isUser});
  final String text;
  final bool isUser;
}

class _MessageBubble extends StatelessWidget {
  const _MessageBubble({required this.message});
  final _ChatMessage message;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: Align(
        alignment: message.isUser ? Alignment.centerRight : Alignment.centerLeft,
        child: Container(
          constraints: BoxConstraints(
            maxWidth: MediaQuery.of(context).size.width * 0.75,
          ),
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
          decoration: BoxDecoration(
            color: message.isUser ? GazganColors.gold : GazganColors.surface,
            borderRadius: BorderRadius.only(
              topLeft: const Radius.circular(18),
              topRight: const Radius.circular(18),
              bottomLeft: message.isUser
                  ? const Radius.circular(18)
                  : const Radius.circular(4),
              bottomRight: message.isUser
                  ? const Radius.circular(4)
                  : const Radius.circular(18),
            ),
          ),
          child: Text(
            message.text,
            style: TextStyle(
              color: message.isUser ? GazganColors.graphite : GazganColors.copy,
              fontSize: 14,
              height: 1.4,
            ),
          ),
        ),
      ),
    );
  }
}

class _TypingIndicator extends StatelessWidget {
  const _TypingIndicator();

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      decoration: BoxDecoration(
        color: GazganColors.surface,
        borderRadius: BorderRadius.circular(18),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          _Dot(),
          const SizedBox(width: 4),
          _Dot(delay: 200),
          const SizedBox(width: 4),
          _Dot(delay: 400),
          const SizedBox(width: 8),
          const Text(
            'Javob tayyorlanmoqda...',
            style: TextStyle(color: GazganColors.muted, fontSize: 13),
          ),
        ],
      ),
    );
  }
}

class _Dot extends StatefulWidget {
  const _Dot({this.delay = 0});
  final int delay;

  @override
  State<_Dot> createState() => _DotState();
}

class _DotState extends State<_Dot> with SingleTickerProviderStateMixin {
  late final AnimationController _ctrl;

  @override
  void initState() {
    super.initState();
    _ctrl = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 800),
    );
    Future.delayed(Duration(milliseconds: widget.delay), () {
      if (mounted) _ctrl.repeat(reverse: true);
    });
  }

  @override
  void dispose() {
    _ctrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _ctrl,
      builder: (context, child) {
        return Opacity(
          opacity: _ctrl.value,
          child: Container(
            width: 8,
            height: 8,
            decoration: const BoxDecoration(
              color: GazganColors.gold,
              shape: BoxShape.circle,
            ),
          ),
        );
      },
    );
  }
}