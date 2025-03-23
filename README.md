# Atelier Style - AI Moda Danışmanı

Atelier Style, etkileşimli bir sohbet arayüzü aracılığıyla kişiselleştirilmiş moda ve makyaj tavsiyeleri sunan yapay zeka destekli bir moda danışmanıdır. Uygulama, stil önerileri ve görsel önizlemeler oluşturmak için gelişmiş yapay zeka modelleri kullanır.

## Özellikler

- StAilist, yapay zeka moda danışmanınız ile etkileşimli sohbet arayüzü
- Kişiselleştirilmiş moda ve makyaj önerileri
- Yapay zeka tarafından oluşturulan görsel stil önizlemeleri
- Modern, duyarlı kullanıcı arayüzü ve güzel animasyonlar

## Teknoloji Altyapısı

- React + TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Hugging Face Inference API (Stable Diffusion XL)
- Google Gemini API (Önerilen: Gemini 1.5 Pro)

Not: Şu anda ücretsiz kullanım hakları nedeniyle Gemini API'nin gemini-2.0-flash sürümü kullanılmaktadır. İhtiyaca göre Gemini 1.5 Pro'ya geçiş yapılabilir. Benzer şekilde, görsel oluşturma modeli de projenin gereksinimlerine göre değiştirilebilir.

## Başlangıç

1. Depoyu klonlayın
```bash
git clone https://github.com/Oussssn/atelier-style.git
cd atelier-style
```

2. Bağımlılıkları yükleyin
```bash
npm install
```

3. Ortam değişkenlerini ayarlayın
- `.env.example` dosyasını `.env` olarak kopyalayın
- [Hugging Face](https://huggingface.co/settings/tokens) adresinden Hugging Face API anahtarınızı alın
- [Google MakerSuite](https://makersuite.google.com/app/apikey) adresinden Gemini API anahtarınızı alın
- API anahtarlarınızı `.env` dosyasına ekleyin

4. Geliştirme sunucusunu başlatın
```bash
npm run dev
```

## Ortam Değişkenleri

Aşağıdaki ortam değişkenleri gereklidir:

- `VITE_HUGGINGFACE_API_KEY`: Stil önizlemeleri oluşturmak için Hugging Face API anahtarınız
- `VITE_GEMINI_API_KEY`: Sohbet arayüzü için Google Gemini API anahtarınız

## Katkıda Bulunma

Katkılarınızı bekliyoruz! Lütfen bir Pull Request göndermekten çekinmeyin.

## Lisans

Bu proje MIT Lisansı altında lisanslanmıştır - detaylar için [LICENSE](LICENSE) dosyasına bakın.

---

# Atelier Style - AI Fashion Advisor

Atelier Style is an AI-powered fashion advisor that provides personalized fashion and makeup advice through an interactive chat interface. The application uses advanced AI models to generate style recommendations and visual previews.

## Features

- Interactive chat interface with StAilist, your AI fashion advisor
- Personalized fashion and makeup recommendations
- Visual style previews using AI-generated images
- Modern, responsive UI with beautiful animations

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Hugging Face Inference API (Stable Diffusion XL)
- Google Gemini API (Recommended: Gemini 1.5 Pro)

Note: Currently using the available version of Gemini API due to free usage rights. Can be upgraded to Gemini 1.5 Pro based on needs. Similarly, the image generation model can be changed according to project requirements.

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/Oussssn/atelier-style.git
cd atelier-style
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
- Copy `.env.example` to `.env`
- Get your Hugging Face API key from [Hugging Face](https://huggingface.co/settings/tokens)
- Get your Gemini API key from [Google MakerSuite](https://makersuite.google.com/app/apikey)
- Add your API keys to the `.env` file

4. Start the development server
```bash
npm run dev
```

## Environment Variables

The following environment variables are required:

- `VITE_HUGGINGFACE_API_KEY`: Your Hugging Face API key for generating style previews
- `VITE_GEMINI_API_KEY`: Your Google Gemini API key for chat interface

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

Contributors:
- @Ezzgiturann

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

Contributors:
- @Ezzgiturann

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.