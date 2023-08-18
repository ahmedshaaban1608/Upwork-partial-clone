const getTime = (dateStr) => {
  const date = new Date(dateStr);
  const currentDate = new Date();
  const timeDifference = currentDate - date;
  const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
  const minutesAgo = Math.floor(timeDifference / (1000 * 60));
  let result;
  if (hoursAgo >= 1) {
    result = `${hoursAgo} ${hoursAgo === 1 ? "hour" : "hours"} ago`;
  } else {
    result = `${minutesAgo} ${minutesAgo === 1 ? "minute" : "minutes"} ago`;
  }
  return result;
};
const showJob = ({ title, description, date }) => {
  const time = getTime(date);
  const html = ` <div class="job border-top border-black-50">
  <div class=" p-4">
  <div class="mb-3 d-flex justify-content-between"><span class="title fw-semibold">${title}</span>
<div style="min-width:100px">
<i class="fa-regular fa-thumbs-down p-2 rounded-circle border border-gray me-2 fs-5"></i>
<i class="fa-regular fa-heart p-2 rounded-circle border border-gray me-2 fs-5"></i>
</div>           
</div>
<div>
<span style="font-size: 14px;">
Hourly - Intermediate - Est. Time: 1 to 3 months, not_sure - Posted ${time}</span>
</div>
<div class="description mt-2" style="font-size: 15px;">
<p class="mb-1">${description}</p>
<a href="#" class="text-primary fw-semibold d-block mb-2">More</a>
<span class="text-black-50" style="font-size: 14px;">Proposals: <strong>5 to 10</strong></span>
</div>
</div>
</div>`;
  return html;
};
export default showJob;
