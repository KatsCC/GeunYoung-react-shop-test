const StarRating = ({ rate }) => {
  const checkedArr = new Array(10).fill(0); // 10개의 요소를 가진 배열을 0으로 초기화
  const filledStars = Math.floor(rate * 2); // 2배하여 정수 부분만큼 별을 채움

  return (
    <div className="rating rating-half">
      {checkedArr.map((_, idx) => {
        // 홀수 인덱스에서 별의 절반을 그릴 때
        if (idx % 2 === 0) {
          return (
            <input
              key={idx}
              type="radio"
              name="rating-10"
              className="bg-yellow-400 cursor-default mask mask-star-2 mask-half-1"
              disabled
              checked={idx < filledStars}
            />
          );
        } else {
          return (
            <input
              key={idx}
              type="radio"
              name="rating-10"
              className="bg-yellow-400 cursor-default mask mask-star-2 mask-half-2"
              disabled
              checked={idx < filledStars}
            />
          );
        }
      })}
    </div>
  );
};

export default StarRating;
