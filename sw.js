/**
 * Alaisai OS - Service Worker 2026
 * وظيفة الملف: ضمان العمل بدون إنترنت وتخزين ملفات النظام Assets
 */

const CACHE_NAME = 'alaisai-ultra-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    './assets/images/logo.png',
    // أضف أي ملفات أساسية أخرى هنا
];

// مرحلة التثبيت: تخزين الملفات الأساسية في الذاكرة المؤقتة
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('🛡️ Alaisai Cache: تم تأمين ملفات النظام الأساسية');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// مرحلة التنشيط: مسح التخزين القديم عند تحديث النظام
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            );
        })
    );
});

// استراتيجية الاستجابة: جلب الملف من الكاش أولاً، ثم الشبكة
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // إذا وجد الملف في الكاش أرجعه، وإلا اطلبه من الإنترنت
            return response || fetch(event.request).catch(() => {
                // في حال انقطاع الإنترنت تماماً عن تطبيق أندرويد
                if (event.request.mode === 'navigate') {
                    return caches.match('./index.html');
                }
            });
        })
    );
});
