
# ==================== Groq LLM Endpoints ====================

class ChatMessage(BaseModel):
    role: str = Field(..., description="Role: 'system', 'user', or 'assistant'")
    content: str = Field(..., description="Message content")

class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    model: str = Field(default="llama-3.3-70b-versatile")
    temperature: float = Field(default=0.7, ge=0, le=2)
    max_tokens: Optional[int] = Field(default=None)

class CodeGenerationRequest(BaseModel):
    prompt: str = Field(..., description="Description of code to generate")
    language: str = Field(default="python", description="Programming language")
    temperature: float = Field(default=0.2, ge=0, le=2)

class VisionRequest(BaseModel):
    image_url: str = Field(..., description="URL of image to analyze")
    prompt: str = Field(default="What's in this image?", description="Question about image")
    model: str = Field(default="llama-3.2-90b-vision-preview")

@app.post("/llm/chat")
async def chat_completion(request: ChatRequest):
    """Chat completion using Groq's LLM models"""
    try:
        messages = [{"role": msg.role, "content": msg.content} for msg in request.messages]
        
        response = groq_client.chat.completions.create(
            model=request.model,
            messages=messages,
            temperature=request.temperature,
            max_tokens=request.max_tokens
        )
        
        return {
            "id": response.id,
            "model": response.model,
            "content": response.choices[0].message.content,
            "role": response.choices[0].message.role,
            "finish_reason": response.choices[0].finish_reason,
            "usage": {
                "prompt_tokens": response.usage.prompt_tokens,
                "completion_tokens": response.usage.completion_tokens,
                "total_tokens": response.usage.total_tokens
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Groq API error: {str(e)}")

@app.post("/llm/code-gen")
async def generate_code(request: CodeGenerationRequest):
    """Generate code using Groq's LLM"""
    try:
        system_prompt = f"You are an expert {request.language} programmer. Generate clean, efficient code."
        
        response = groq_client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": request.prompt}
            ],
            temperature=request.temperature,
            max_tokens=2048
        )
        
        return {
            "code": response.choices[0].message.content,
            "language": request.language,
            "tokens_used": response.usage.total_tokens
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Code gen error: {str(e)}")

@app.post("/llm/vision")
async def vision_analysis(request: VisionRequest):
    """Analyze images using Groq's vision model"""
    try:
        response = groq_client.chat.completions.create(
            model=request.model,
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": request.prompt},
                        {"type": "image_url", "image_url": {"url": request.image_url}}
                    ]
                }
            ]
        )
        
        return {
            "analysis": response.choices[0].message.content,
            "model": response.model,
            "tokens_used": response.usage.total_tokens
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Vision error: {str(e)}")

@app.get("/llm/models")
async def list_groq_models():
    """List available Groq models"""
    return {
        "chat_models": [
            "llama-3.3-70b-versatile",
            "llama-3.1-8b-instant",
            "mixtral-8x7b-32768",
            "gemma2-9b-it"
        ],
        "vision_models": [
            "llama-3.2-90b-vision-preview",
            "llama-3.2-11b-vision-preview"
        ],
        "recommended": "llama-3.3-70b-versatile"
    }
