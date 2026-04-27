from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

ROI_DATA = {
    "granite-processing": {"roi": 0.25, "payback_years": 4},
    "marble-processing": {"roi": 0.22, "payback_years": 5},
    "quarry-development": {"roi": 0.30, "payback_years": 3},
    "souvenir-factory": {"roi": 0.30, "payback_years": 3},
    "export-line": {"roi": 0.18, "payback_years": 6},
}

ROI_MAP = {
    "granite-processing": "Granit qayta ishlash",
    "marble-processing": "Marmar qayta ishlash",
    "quarry-development": "Kon ochish",
    "souvenir-factory": "Suvenir ishlab chiqarish",
}

@app.route('/api/investments/calculate', methods=['POST'])
def calculate_investment():
    data = request.json
    amount = data.get('amount', 5000000)
    project_type = data.get('project_type', 'marble-processing')
    period = data.get('period', 5)
    
    project = ROI_DATA.get(project_type, ROI_DATA["marble-processing"])
    annual_return = amount * project["roi"]
    total_return = annual_return * period
    
    optimistic_roi = project["roi"] + 0.07
    pessimistic_roi = max(project["roi"] - 0.07, 0.05)
    
    return jsonify({
        "invested_amount": amount,
        "project_name": ROI_MAP.get(project_type, project_type),
        "period": period,
        "annual_return_percent": project["roi"] * 100,
        "annual_return_amount": annual_return,
        "payback_years": project["payback_years"],
        "total_return": total_return,
        "scenarios": {
            "optimistic": {
                "roi": optimistic_roi * 100,
                "annual_return": amount * optimistic_roi,
                "total_return": amount * optimistic_roi * period
            },
            "realistic": {
                "roi": project["roi"] * 100,
                "annual_return": annual_return,
                "total_return": total_return
            },
            "pessimistic": {
                "roi": pessimistic_roi * 100,
                "annual_return": amount * pessimistic_roi,
                "total_return": amount * pessimistic_roi * period
            }
        }
    })

DASHBOARD_DATA = {
    "user": {"name": "Aziz", "role": "investor"},
    "stats": {
        "savedProjects": 3,
        "documents": 7,
        "aiConsultations": 12,
        "notifications": 5
    },
    "projects": [
        {"id": 1, "name": "Yangi granit qayta ishlash sexi", "amount": 5000000, "roi": 25, "payback": 4, "status": "Ko'rib chiqilmoqda"},
        {"id": 2, "name": "Marmar bloklar eksport liniyasi", "amount": 3000000, "roi": 22, "payback": 5, "status": "Tasdiqlangan"},
        {"id": 3, "name": "Suvenir ishlab chiqarish fabrikasi", "amount": 1500000, "roi": 30, "payback": 3, "status": "Yangi"}
    ],
    "documents": [
        {"id": 1, "name": "EIZ rezidentligi uchun ariza", "date": "2026-01-15", "icon": "📄"},
        {"id": 2, "name": "Biznes-reja namunasi", "date": "2026-01-10", "icon": "📋"},
        {"id": 3, "name": "Investitsiya shartnomasi loyihasi", "date": "2026-01-08", "icon": "📊"},
        {"id": 4, "name": "Moliyaviy hisobot shabloni", "date": "2026-01-05", "icon": "📈"},
    ],
    "chatHistory": [
        {"id": 1, "question": "G'ozg'on marmarining asosiy turlari qaysilar?", "time": "2 soat oldin", "answer": "G'ozg'on marmarining asosiy turlari: oq, pushti, kulrang va oltin marmarlar."},
        {"id": 2, "question": "EIZ rezidenti bo'lish uchun qanday hujjatlar kerak?", "time": "1 soat oldin", "answer": "EIZ rezidenti bo'lish uchun: Ariza, Biznes-reja, Ta'sis hujjatlari, Investitsiya loyihasi tavsifi."},
    ],
    "notifications": [
        {"id": 1, "text": "Yangi investitsiya loyihasi qo'shildi", "time": "30 daqiqa oldin", "icon": "📢"},
        {"id": 2, "text": "Hujjatingiz tasdiqlandi", "time": "2 soat oldin", "icon": "📄"},
        {"id": 3, "text": "Hujjat topshirish muddati yaqinlashmoqda", "time": "1 kun oldin", "icon": "⚠️"},
    ]
}

@app.route('/api/dashboard', methods=['GET'])
def get_dashboard():
    return jsonify(DASHBOARD_DATA)

@app.route('/api/dashboard/save-project/<int:project_id>', methods=['POST'])
def save_project(project_id):
    return jsonify({"success": True, "message": "Loyiha saqlandi"})

@app.route('/api/dashboard/notifications', methods=['GET'])
def get_notifications():
    return jsonify(DASHBOARD_DATA["notifications"])

@app.route('/api/dashboard/notifications/<int:notif_id>/read', methods=['POST'])
def mark_notification_read(notif_id):
    return jsonify({"success": True})

if __name__ == '__main__':
    app.run(debug=True, port=8000)