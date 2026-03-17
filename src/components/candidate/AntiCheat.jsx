import { useState, useEffect, useCallback, useRef } from 'react';
import { Shield, ShieldAlert } from 'lucide-react';

// --- Hook ---
export function useAntiCheat() {
  const [violationLog, setViolationLog] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const overlayTimer = useRef(null);

  const addViolation = useCallback((type) => {
    setViolationLog((prev) => [...prev, { type, timestamp: new Date() }]);
  }, []);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') {
        addViolation('tab_switch');
      } else {
        // Returning to page — show overlay
        setShowOverlay(true);
        clearTimeout(overlayTimer.current);
        overlayTimer.current = setTimeout(() => setShowOverlay(false), 2000);
      }
    };

    const handleBlur = () => {
      addViolation('window_blur');
    };

    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    const handleCopy = (e) => {
      // Allow copy inside Monaco editor
      const target = e.target;
      if (target.closest('.monaco-editor')) return;
      addViolation('copy_attempt');
    };

    const handlePaste = (e) => {
      const target = e.target;
      if (target.closest('.monaco-editor')) return;
      addViolation('copy_attempt');
    };

    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('blur', handleBlur);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('paste', handlePaste);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('blur', handleBlur);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('paste', handlePaste);
      clearTimeout(overlayTimer.current);
    };
  }, [addViolation]);

  const violations = {
    tabSwitches: violationLog.filter((v) => v.type === 'tab_switch').length,
    windowBlurs: violationLog.filter((v) => v.type === 'window_blur').length,
    copyAttempts: violationLog.filter((v) => v.type === 'copy_attempt').length,
  };
  const violationCount = violationLog.length;

  return { violations, violationCount, violationLog, showOverlay };
}

// --- Banner ---
export function AntiCheatBanner({ violationCount }) {
  if (violationCount === 0) {
    return (
      <div className="h-1 bg-emerald-600/30 shrink-0" />
    );
  }

  if (violationCount <= 2) {
    return (
      <div className="flex items-center gap-2 px-4 py-1.5 bg-amber-900/60 text-amber-300 text-xs font-medium shrink-0 border-b border-amber-700/50">
        <ShieldAlert size={14} />
        <span>⚠️ 检测到 {violationCount} 次页面切换，请保持在测试页面</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 px-4 py-1.5 bg-red-900/60 text-red-300 text-xs font-medium shrink-0 border-b border-red-700/50 animate-pulse">
      <ShieldAlert size={14} />
      <span>🚫 多次切屏已记录（{violationCount}次），面试官将收到通知</span>
    </div>
  );
}

// --- Overlay ---
export function AntiCheatOverlay({ visible }) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70">
      <div className="bg-slate-800 rounded-xl shadow-2xl p-8 max-w-sm mx-4 border-2 border-red-500 text-center">
        <ShieldAlert size={40} className="text-red-400 mx-auto mb-4" />
        <p className="text-white text-lg font-semibold mb-2">您已离开测试页面</p>
        <p className="text-slate-400 text-sm">本次切换已被记录</p>
      </div>
    </div>
  );
}

// --- Shield badge for header ---
export function AntiCheatShield({ violationCount }) {
  if (violationCount === 0) {
    return <Shield size={14} className="text-emerald-400" />;
  }

  return (
    <span className="relative inline-flex items-center">
      <ShieldAlert
        size={14}
        className={violationCount >= 3 ? 'text-red-400' : 'text-amber-400'}
      />
      <span
        className={`absolute -top-1.5 -right-2.5 text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center ${
          violationCount >= 3
            ? 'bg-red-500 text-white'
            : 'bg-amber-500 text-white'
        }`}
      >
        {violationCount}
      </span>
    </span>
  );
}
