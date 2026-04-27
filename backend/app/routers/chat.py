from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional
import openai
from app.database import get_db
from app.models import ChatMessage, User
from app.schemas import ChatMessageRequest, ChatMessageResponse
from app.routers.auth import get_current_user
from app.config import settings

router = APIRouter()

QUARRY_CONTEXT = """
Siz G'ozg'on investitsion portalining AI konsultantısız. 
G'ozg'on marmar va granit konlari haqida savollarga javob bering.

G'ozg'on haqida umumiy ma'lumot:
- Navoiy viloyatida joylashgan
- Marmar turlari: oq, pushti, kulrang, oltin
- Granit turlari: kulrang, qora, qizil
- Jami zaxira: 250 mln m³ dan ortiq
- 12+ faol kon
- 25+ davlatga eksport

Investitsiya imkoniyatlari:
- EIZ (Erkin Iqtisodiy Zona) maqomi
- Soliq imtiyozlari (foyda solig'i, bojxona to'lovlari)
- ROI: 20-30% yillik
- Qoplash muddati: 3-5 yil
"""

def get_ai_response(message: str) -> str:
    if not settings.OPENAI_API_KEY:
        return get_fallback_response(message)
    
    try:
        openai.api_key = settings.OPENAI_API_KEY
        
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": QUARRY_CONTEXT},
                {"role": "user", "content": message}
            ],
            max_tokens=500,
            temperature=0.7
        )
        
        return response.choices[0].message.content
    except Exception as e:
        return get_fallback_response(message)

def get_fallback_response(message: str) -> str:
    message_lower = message.lower()
    
    if any(word in message_lower for word in ['marmar', 'marble', 'tosh', 'stone']):
        return "G'ozg'on marmarining asosiy turlari: oq, pushti, kulrang va oltin marmarlar. Har bir tur o'ziga xos tekstura va fizik xususiyatlarga ega. Batafsil ma'lumotni 'Konlar' sahifasida topishingiz mumkin."
    
    elif any(word in message_lower for word in ['granit', 'qora', 'kulrang', 'qizil']):
        return "G'ozg'on graniti yuqori sifatli kulrang, qora va qizil ranglarda mavjud. Granit qurilish va bezak uchun eng ideal material hisoblanadi. Batafsil ma'lumotni 'Konlar' sahifasida ko'rishingiz mumkin."
    
    elif any(word in message_lower for word in ['investitsiya', 'invest', 'roi', 'daromad']):
        return "Investitsiya uchun eng qulay imkoniyatlar mavjud: EIZ maqomi, soliq imtiyozlari, 20-30% yillik ROI. Batafsil ma'lumotni 'Investitsiya' sahifasida topishingiz mumkin."
    
    elif any(word in message_lower for word in ['eiz', 'erkin iqtisodiy', 'soliq', 'imtiyoz']):
        return "EIZ rezidenti bo'lish uchun quyidagi hujjatlar kerak: 1) Ariza, 2) Biznes-reja, 3) Ta'sis hujjatlari. Biz sizga bu jarayonda yordam berishga tayyormiz."
    
    elif any(word in message_lower for word in ['narx', '_price', 'baholash']):
        return "Narxlar mahsulot turi, o'lchami va ishlov berish turiga bog'liq. Aniq narxni bilish uchun 'Mahsulotlar' sahifasida yoki biz bilan bog'lanish orqali murojaat qiling."
    
    else:
        return "Savolingizga javob berish uchun menga ko'proq ma'lumot bering. Siz marmar, granit, investitsiya yoki mahsulotlar haqida so'rashingiz mumkin. Men tezda javob beraman!"

@router.post("/message", response_model=ChatMessageResponse)
async def send_message(
    data: ChatMessageRequest,
    db: Session = Depends(get_db),
    current_user: Optional[User] = None
):
    user_id = current_user.id if current_user else None
    
    user_message = ChatMessage(
        user_id=user_id,
        role="user",
        content=data.message
    )
    db.add(user_message)
    db.commit()
    
    response_text = get_ai_response(data.message)
    
    bot_message = ChatMessage(
        user_id=user_id,
        role="assistant",
        content=response_text
    )
    db.add(bot_message)
    db.commit()
    
    return ChatMessageResponse(response=response_text)