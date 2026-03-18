'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { markerFormSchema, type MarkerFormInput } from '@/lib/validations/markerForm'
import { useCreateMarkerMutation } from '@/hooks/useMarkers'

export default function FormsPage() {
  const [successMessage, setSuccessMessage] = useState('')
  const createMarkerMutation = useCreateMarkerMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MarkerFormInput>({
    resolver: zodResolver(markerFormSchema),
    defaultValues: {
      title: '',
      lat: 37.5665,
      lng: 126.9780,
      description: '',
    },
  })

  const onSubmit = async (data: MarkerFormInput) => {
    try {
      await createMarkerMutation.mutateAsync(data)
      setSuccessMessage('마커가 성공적으로 추가되었습니다!')
      reset()
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      console.error('마커 추가 실패:', error)
    }
  }

  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold">폼 예제</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          react-hook-form + zod를 사용한 마커 추가 폼
        </p>
      </div>

      <div className="max-w-md rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        {successMessage && (
          <div className="mb-4 rounded bg-green-100 p-3 text-green-800 dark:bg-green-900 dark:text-green-200">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* 제목 */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              제목
            </label>
            <input
              id="title"
              type="text"
              placeholder="마커 제목을 입력하세요"
              className={`mt-1 block w-full rounded border ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              } bg-white px-3 py-2 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white`}
              {...register('title')}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* 위도 */}
          <div>
            <label htmlFor="lat" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              위도 (Latitude)
            </label>
            <input
              id="lat"
              type="number"
              step="0.0001"
              placeholder="37.5665"
              className={`mt-1 block w-full rounded border ${
                errors.lat ? 'border-red-500' : 'border-gray-300'
              } bg-white px-3 py-2 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white`}
              {...register('lat', { valueAsNumber: true })}
            />
            {errors.lat && (
              <p className="mt-1 text-sm text-red-500">{errors.lat.message}</p>
            )}
          </div>

          {/* 경도 */}
          <div>
            <label htmlFor="lng" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              경도 (Longitude)
            </label>
            <input
              id="lng"
              type="number"
              step="0.0001"
              placeholder="126.9780"
              className={`mt-1 block w-full rounded border ${
                errors.lng ? 'border-red-500' : 'border-gray-300'
              } bg-white px-3 py-2 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white`}
              {...register('lng', { valueAsNumber: true })}
            />
            {errors.lng && (
              <p className="mt-1 text-sm text-red-500">{errors.lng.message}</p>
            )}
          </div>

          {/* 설명 */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              설명 (선택사항)
            </label>
            <textarea
              id="description"
              placeholder="마커 설명을 입력하세요"
              className={`mt-1 block w-full rounded border ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              } bg-white px-3 py-2 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white`}
              rows={3}
              {...register('description')}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>

          {/* 제출 버튼 */}
          <button
            type="submit"
            disabled={createMarkerMutation.isPending}
            className="w-full rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {createMarkerMutation.isPending ? '추가 중...' : '마커 추가'}
          </button>
        </form>
      </div>
    </div>
  )
}
