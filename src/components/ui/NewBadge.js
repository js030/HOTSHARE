export default function NewBadge({ createdAt }) {
  const isNew = () => {
    const today = new Date();
    const createdDate = new Date(createdAt);
    const diffTime = Math.abs(today - createdDate);

    // 2시간 이내
    const diffHours = diffTime / (1000 * 60 * 60); // 시간 차이를 계산합니다.
    return diffHours <= 2; // 2시간 이내인지 확인합니다.

    // 하루 이내
    /* const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 1; */
  };

  return (
    <>
      {isNew() && (
        <span className='badge badge-sm border-none text-rose-400'>NEW</span>
      )}
    </>
  );
}
