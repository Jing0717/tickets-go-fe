export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000)

  return new Intl.DateTimeFormat('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date)
}
