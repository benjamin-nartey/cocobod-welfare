"use client";
export default function LottieVideo() {
  return (
    <video className="w-full h-full" muted autoPlay loop>
      <source src="LoanVideo.mp4" />
    </video>
  );
}
