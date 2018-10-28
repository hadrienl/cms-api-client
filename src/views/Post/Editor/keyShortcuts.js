const ENTER = 'Enter';

export default function keyShortcuts ({ key, ctrlKey, metaKey, shiftKey, content, selectionStart }) {
  const shortcut = getShortcut({ key, ctrlKey, metaKey, shiftKey })
  return shortcut({ content, selectionStart });
}

function getShortcut({ key, ctrlKey, metaKey, shiftKey }) {
  switch (true) {
    case (ctrlKey || metaKey) && key === ENTER:
      return insertBr;
    case (ctrlKey || metaKey) && shiftKey && key === 'I':
      return insertImage;
    case (ctrlKey || metaKey) && shiftKey && key === 'L':
      return insertLink;
    case (key === 'Tab'):
      return insertTab;
    default:
      return () => null;
  }
}

function insertBr ({ content, selectionStart }) {
  const hasSpaceBefore = content.charAt(selectionStart - 1) === ' ';
  const br = (hasSpaceBefore ? '' : ' ') + ' ';
  return {
    content: `${content.slice(0, selectionStart)}${br}\n${content.slice(selectionStart, +Infinity)}`,
    carret: hasSpaceBefore ? 2 : 3,
  };
}

function insertImage ({ content, selectionStart }) {
  const image = '![]()';
  return {
    content: `${content.slice(0, selectionStart)}${image}\n${content.slice(selectionStart, Infinity)}`,
    carret: 2,
  };
}


function insertLink ({ content, selectionStart }) {
  const link = '[]()';
  return {
    content: `${content.slice(0, selectionStart)}${link}\n${content.slice(selectionStart, Infinity)}`,
    carret: 1,
  };
}

function insertTab ({ content, selectionStart }) {
  const tab = '    ';
  return {
    content: `${content.slice(0, selectionStart)}${tab}${content.slice(selectionStart, Infinity)}`,
    carret: 4,
  }
}
