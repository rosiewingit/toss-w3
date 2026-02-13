import { redirect } from 'next/navigation';

export default function MapPage() {
  // 간단 버전에서는 지도 페이지를 사용하지 않고 피드로 보낸다.
  redirect('/feed');
}
