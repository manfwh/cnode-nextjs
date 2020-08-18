export function getTabName(tab) {
  if (tab === 'share') {
    return '分享'
  } else if (tab === 'good') {
    return '精华'
  } else if (tab === 'job') {
    return '招聘'
  } else if (tab === 'ask') {
    return '问答'
  }
  return ''
}