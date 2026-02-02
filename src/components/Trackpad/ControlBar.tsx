import React from 'react';

interface ControlBarProps {
    scrollMode: boolean;
    keyboardOpen: boolean;
    onToggleScroll: () => void;
    onLeftClick: () => void;
    onRightClick: () => void;
    onKeyboardToggle: () => void;
}

export const ControlBar: React.FC<ControlBarProps> = ({
    scrollMode,
    keyboardOpen,
    onToggleScroll,
    onLeftClick,
    onRightClick,
    onKeyboardToggle
}) => {
    const handleInteraction = (e: React.PointerEvent, action: () => void) => {
        e.preventDefault();
        action();
    };

    return (
        <div className="bg-base-200 p-2 grid grid-cols-4 gap-2 shrink-0">
            <button
                className={`btn btn-sm ${scrollMode ? 'btn-primary' : 'btn-outline'}`}
                onPointerDown={(e) => handleInteraction(e, onToggleScroll)}
            >
                {scrollMode ? 'Scroll' : 'Cursor'}
            </button>
            <button
                className="btn btn-sm btn-outline"
                onPointerDown={(e) => handleInteraction(e, onLeftClick)}
                title="Mouse click at cursor position"
            >
                L-Click
            </button>
            <button
                className="btn btn-sm btn-outline"
                onPointerDown={(e) => handleInteraction(e, onRightClick)}
            >
                R-Click
            </button>
            <button
                className={`btn btn-sm ${keyboardOpen ? 'btn-secondary' : 'btn-secondary btn-outline'}`}
                onPointerDown={(e) => handleInteraction(e, onKeyboardToggle)}
                title={keyboardOpen ? 'Keyboard open (tap to close)' : 'Open keyboard'}
            >
                Keyboard
            </button>
        </div>
    );
};
