import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface ExtraKeysProps {
	sendKey: (key: string) => void;
	keyboardOpen?: boolean;
}

/** Compact row: always visible (original / most-used keys) */
const COMPACT_KEYS: { label: string; key: string }[] = [
	{ label: 'Esc', key: 'esc' },
	{ label: 'Tab', key: 'tab' },
	{ label: 'Ctrl', key: 'ctrl' },
	{ label: 'Alt', key: 'alt' },
	{ label: 'Shift', key: 'shift' },
	{ label: 'Meta', key: 'meta' },
	{ label: 'Home', key: 'home' },
	{ label: 'End', key: 'end' },
	{ label: 'PgUp', key: 'pgup' },
	{ label: 'PgDn', key: 'pgdn' },
	{ label: 'Del', key: 'del' },
];

/** Full special keys: shown when expanded (must match KeyMap.ts) */
const KEY_GROUPS: { label: string; key: string }[][] = [
	[
		{ label: 'Ins', key: 'insert' },
		{ label: '↑', key: 'arrowup' },
		{ label: '↓', key: 'arrowdown' },
		{ label: '←', key: 'arrowleft' },
		{ label: '→', key: 'arrowright' },
	],
	[
		{ label: 'F1', key: 'f1' },
		{ label: 'F2', key: 'f2' },
		{ label: 'F3', key: 'f3' },
		{ label: 'F4', key: 'f4' },
		{ label: 'F5', key: 'f5' },
		{ label: 'F6', key: 'f6' },
		{ label: 'F7', key: 'f7' },
		{ label: 'F8', key: 'f8' },
		{ label: 'F9', key: 'f9' },
		{ label: 'F10', key: 'f10' },
		{ label: 'F11', key: 'f11' },
		{ label: 'F12', key: 'f12' },
	],
	[
		{ label: 'Mute', key: 'audiomute' },
		{ label: 'Vol−', key: 'audiovoldown' },
		{ label: 'Vol+', key: 'audiovolup' },
		{ label: 'Prev', key: 'audioprev' },
		{ label: 'Next', key: 'audionext' },
	],
];

export const ExtraKeys: React.FC<ExtraKeysProps> = ({ sendKey, keyboardOpen = false }) => {
	const [expanded, setExpanded] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);

	const handleInteract = (e: React.PointerEvent, key: string) => {
		e.preventDefault();
		sendKey(key);
	};

	const handlePlayPause = (e: React.PointerEvent) => {
		e.preventDefault();
		if (isPlaying) {
			sendKey('audiopause');
		} else {
			sendKey('audioplay');
		}
		setIsPlaying((prev) => !prev);
	};

	const toggleExpanded = (e: React.PointerEvent) => {
		e.preventDefault();
		setExpanded((prev) => !prev);
	};

	return (
		<div
			className={`bg-base-300 p-2 shrink-0 space-y-2 ${keyboardOpen ? 'overflow-x-auto overflow-y-hidden max-h-32' : 'overflow-x-auto'}`}
			style={keyboardOpen ? { WebkitOverflowScrolling: 'touch' } : undefined}
		>
			{/* Compact row: always visible; when keyboard open, no wrap so row scrolls horizontally */}
			<div className={`flex gap-2 items-center ${keyboardOpen ? 'flex-nowrap' : 'flex-wrap'}`}>
				{COMPACT_KEYS.map(({ label, key }) => (
					<button
						key={key}
						type="button"
						className="btn btn-sm btn-neutral min-w-[2.5rem]"
						onPointerDown={(e) => handleInteract(e, key)}
					>
						{label}
					</button>
				))}
				{/* Arrow toggle: show more / show less special keys */}
				<button
					type="button"
					className="btn btn-sm btn-outline gap-1 min-w-[2.5rem]"
					onPointerDown={toggleExpanded}
					title={expanded ? 'Hide extra keys' : 'Show more keys'}
					aria-expanded={expanded}
				>
					{expanded ? (
						<>
							<ChevronUp className="w-4 h-4" aria-hidden />
							<span className="sr-only">Hide extra keys</span>
						</>
					) : (
						<>
							<ChevronDown className="w-4 h-4" aria-hidden />
							<span className="sr-only">Show more keys</span>
						</>
					)}
				</button>
			</div>

			{/* Extra rows: only when expanded; when keyboard open, no wrap so row scrolls horizontally */}
			{expanded &&
				KEY_GROUPS.map((row, i) => (
					<div key={i} className={`flex gap-2 ${keyboardOpen ? 'flex-nowrap' : 'flex-wrap'}`}>
						{i === KEY_GROUPS.length - 1 ? (
							<>
								{row.slice(0, 3).map(({ label, key }) => (
									<button
										key={key}
										type="button"
										className="btn btn-sm btn-neutral min-w-[2.5rem]"
										onPointerDown={(e) => handleInteract(e, key)}
									>
										{label}
									</button>
								))}
								<button
									type="button"
									className="btn btn-sm btn-neutral min-w-[2.5rem]"
									onPointerDown={handlePlayPause}
									title={isPlaying ? 'Pause' : 'Play'}
								>
									{isPlaying ? 'Pause' : 'Play'}
								</button>
								{row.slice(3).map(({ label, key }) => (
									<button
										key={key}
										type="button"
										className="btn btn-sm btn-neutral min-w-[2.5rem]"
										onPointerDown={(e) => handleInteract(e, key)}
									>
										{label}
									</button>
								))}
							</>
						) : (
							row.map(({ label, key }) => (
								<button
									key={key}
									type="button"
									className="btn btn-sm btn-neutral min-w-[2.5rem]"
									onPointerDown={(e) => handleInteract(e, key)}
								>
									{label}
								</button>
							))
						)}
					</div>
				))}
		</div>
	);
};
