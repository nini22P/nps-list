export const fileSizeConv = (fileSize: number) => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(fileSize) / Math.log(1024))
  return (fileSize / Math.pow(1024, i)).toFixed(2) + ' ' + units[i]
}

export const getFileSize = (fileSize: string) => Number(fileSize) ? fileSizeConv(Number(fileSize)) : null

export const canDownload = (PKGDirectLink: string) => (/^http.*/.test(PKGDirectLink))

export const timeConv = (lastModificationDate: string) => Number(lastModificationDate.replace(/[/ :]/g, ''))