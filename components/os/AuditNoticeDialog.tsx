import React from 'react';

interface AuditNoticeDialogProps {
    notice: { charName: string; kind: 'chat' | 'forum'; detail: string } | null;
    onClose: () => void;
}

// 角色反查提醒弹窗：后台角色偷偷「感知」了用户的聊天 / 论坛内容时，居中弹一个暖色提示。
// 刻意区别于红色报错弹窗（ErrorDialog）——这是一条带点暧昧/被窥探感的通知，不是错误。
const AuditNoticeDialog: React.FC<AuditNoticeDialogProps> = ({ notice, onClose }) => {
    if (!notice) return null;

    const isForum = notice.kind === 'forum';
    const title = isForum
        ? `${notice.charName} 悄悄刷到了你的论坛`
        : `${notice.charName} 悄悄翻看了你`;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 animate-fade-in" style={{ zIndex: 10000 }}>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-pop-in">
                <div className="p-5 pb-3">
                    <div className="flex gap-3 items-start">
                        <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                            </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-base font-bold text-slate-800 leading-6 break-words">{title}</h3>
                        </div>
                    </div>
                </div>
                <div className="px-5 pb-3">
                    <p className="text-[13px] leading-relaxed text-slate-600 break-words">
                        {notice.detail}
                    </p>
                </div>
                <div className="bg-slate-50 px-5 py-3 flex justify-end border-t border-slate-100">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 bg-rose-500 rounded-xl text-sm font-bold text-white shadow-lg shadow-rose-200 active:scale-95 transition-transform"
                    >
                        知道了
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuditNoticeDialog;
