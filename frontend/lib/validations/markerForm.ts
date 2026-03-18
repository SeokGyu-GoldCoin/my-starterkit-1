import { z } from 'zod'

export const markerFormSchema = z.object({
  title: z
    .string()
    .min(1, '제목을 입력해주세요')
    .max(50, '제목은 50자 이하여야 합니다'),
  lat: z
    .number()
    .min(-90, '위도는 -90 이상이어야 합니다')
    .max(90, '위도는 90 이하여야 합니다'),
  lng: z
    .number()
    .min(-180, '경도는 -180 이상이어야 합니다')
    .max(180, '경도는 180 이하여야 합니다'),
  description: z
    .string()
    .max(200, '설명은 200자 이하여야 합니다'),
})

export type MarkerFormInput = z.infer<typeof markerFormSchema>
