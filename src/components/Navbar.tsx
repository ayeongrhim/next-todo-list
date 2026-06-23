/*
 * 네브바 컴포넌트
 * 로고 클릭 시 메인 페이지("/")로 이동(새로고침)
 * 반응형: 데스크탑/태블릿은 큰 로고, 모바일은 작은 로고
 */

"use client";

import Image from "next/image";

export default function Navbar() {
  const handleLogoClick = () => {
    window.location.href = "/";
  };

  return (
    <nav className="w-full h-[60px] bg-white border-b border-slate-200 flex items-center">
      {/* 컨텐츠 영역을 page.tsx와 동일하게 max-w + padding 맞춤 */}
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6">
        <button
          type="button"
          onClick={handleLogoClick}
          className="cursor-pointer"
        >
          {/* 데스크탑/태블릿 로고 */}
          <Image
            src="/images/logo.svg"
            alt="Do it! 로고"
            width={151}
            height={40}
            priority
            className="hidden sm:block"
          />
          {/* 모바일 로고 */}
          <Image
            src="/images/logo-small.svg"
            alt="Do it! 로고"
            width={71}
            height={40}
            priority
            className="block sm:hidden"
          />
        </button>
      </div>
    </nav>
  );
}
