/**
 * Alaisai File Manager - مدير الملفات الحقيقي
 * @version 1.0.0
 */

const AlaisaiFileManager = {
    version: '1.0.0',
    
    // فتح نافذة مدير الملفات
    open() {
        const content = `
        <div class="admin-ui" style="direction:ltr; text-align:left; max-width:800px; margin:0 auto;">
            <h2 style="color:#4cc9f0;">📁 مدير الملفات الحقيقي</h2>
            <p style="margin-bottom:20px;">هنا يمكنك تصفح وتعديل جميع ملفات النظام والإضافات.</p>
            
            <div style="display:grid; grid-template-columns:1fr 2fr; gap:20px;">
                <!-- الشريط الجانبي -->
                <div style="background:#2a2a32; border-radius:10px; padding:15px;">
                    <h4 style="color:#4cc9f0;">📂 المجلدات</h4>
                    <div onclick="AlaisaiFileManager.loadFolder('system')" style="padding:8px; background:#1a1a2e; border-radius:5px; margin-bottom:5px; cursor:pointer;">📁 /system</div>
                    <div onclick="AlaisaiFileManager.loadFolder('addons')" style="padding:8px; background:#1a1a2e; border-radius:5px; margin-bottom:5px; cursor:pointer;">📁 /addons</div>
                </div>
                
                <!-- محتوى المجلد -->
                <div style="background:#2a2a32; border-radius:10px; padding:15px;">
                    <h4 style="color:#4cc9f0;">📄 الملفات</h4>
                    <div id="file-list" style="min-height:200px; background:#1a1a2e; border-radius:5px; padding:10px;">
                        اختر مجلداً من اليمين
                    </div>
                </div>
            </div>
            
            <!-- منطقة عرض الكود -->
            <div id="code-viewer" style="margin-top:20px; display:none;">
                <h4 style="color:#4cc9f0;">📝 محرر الكود</h4>
                <textarea id="code-editor" style="width:100%; height:300px; background:#1a1a2e; color:#fff; border:1px solid #4cc9f0; border-radius:5px; padding:10px; font-family:monospace; direction:ltr;"></textarea>
                <div style="margin-top:10px;">
                    <button class="adm-btn" onclick="AlaisaiFileManager.saveFile()" style="background:#4ade80;">💾 حفظ</button>
                    <button class="adm-btn" onclick="AlaisaiFileManager.closeViewer()">❌ إغلاق</button>
                </div>
            </div>
        </div>
        `;
        
        AlaisaiOS.openApp({ name: "مدير الملفات", content: content });
    },
    
    // تحميل مجلد
    loadFolder(folder) {
        // محاكاة تحميل الملفات (سنطورها لاحقاً)
        const fileList = document.getElementById('file-list');
        if (!fileList) return;
        
        if (folder === 'system') {
            fileList.innerHTML = `
                <div class="file-item" onclick="AlaisaiFileManager.openFile('system/core/core.js')">📄 core.js</div>
                <div class="file-item" onclick="AlaisaiFileManager.openFile('system/core/api.js')">📄 api.js</div>
                <div class="file-item" onclick="AlaisaiFileManager.openFile('system/config/settings.json')">📄 settings.json</div>
            `;
        } else if (folder === 'addons') {
            fileList.innerHTML = '<div style="color:#666;">📭 لا توجد إضافات بعد</div>';
        }
    },
    
    // فتح ملف
    openFile(path) {
        document.getElementById('file-list').style.display = 'none';
        document.getElementById('code-viewer').style.display = 'block';
        
        // محاكاة تحميل المحتوى
        document.getElementById('code-editor').value = `// محتوى ملف ${path}\n// هذا ملف تجريبي - سيتم تفعيل القراءة الفعلية لاحقاً`;
        window.currentFilePath = path;
    },
    
    // حفظ الملف
    saveFile() {
        const content = document.getElementById('code-editor').value;
        alert(`✅ تم حفظ الملف:\n${window.currentFilePath}\n\n(محاكاة - التفعيل الحقيقي قادم)`);
    },
    
    // إغلاق المحرر
    closeViewer() {
        document.getElementById('code-viewer').style.display = 'none';
        document.getElementById('file-list').style.display = 'block';
    }
};

// إضافة زر في لوحة الإدارة
const originalRenderTab = Admin?.renderTab;
if (originalRenderTab) {
    Admin.renderTab = function(tab) {
        originalRenderTab.call(this, tab);
        if (tab === 'storage') {
            const view = document.getElementById('admin-view');
            if (view) {
                view.innerHTML += `
                <div style="margin-top:20px; text-align:center;">
                    <button class="adm-btn" onclick="AlaisaiFileManager.open()" style="background:#4cc9f0;">📂 فتح مدير الملفات</button>
                </div>
                `;
            }
        }
    };
}

window.AlaisaiFileManager = AlaisaiFileManager;
