const ENTER = 'Enter';

export default function keyShortcuts ({ key, ctrlKey, metaKey, shiftKey }) {
  const shortcut = getShortcut({ key, ctrlKey, metaKey, shiftKey })
  return shortcut();
}

function getShortcut({ key, ctrlKey, metaKey, shiftKey }) {
  console.log({key})
  switch (true) {
    case (ctrlKey || metaKey) && key === 's':
      return save;
  }
}

function save () {
  console.log({'save'})
}
