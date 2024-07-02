const stickySections = [...document.querySelectorAll('.sticky')]
console.log(stickySections)


window.addEventListener('scroll', () => {
    for(let i=0; i<stickySections.length; i++){
        transform(stickySections[i])
    }
})

// window.scrollY - offsetTop : 브라우저에서 해당 섹션이 얼마나 떨어져 있는지의 거리
// ((window.scrollY - offsetTop) / window.innerHeight) * 100 : 뷰 포트내에서 얼마나 스크롤되었는지의 비율
// 맨 처음 offsetTop 이 100vh 이므로 음수값이다. 그러므로 x 축으로 왼쪽에 위치한다.
// 스크롤이 올라가면 percent 는 0 에 가까워지므로 섹션은 원래 위치로 돌아온다.
// 즉, 해당 섹션은 왼쪽에서 우측으로 이동한다. 
// 해당 섹션이 브라우저 상단과 일치하면 sticky 에 의해 고정되고, 섹션은 원위치가 된다.
// 스크롤을 더 올리면, 섹션은 여전히 고정되고, percent 가 양수값으로 커지면서 우측으로 이동한다.
// percent 에 -1 을 곱해서 반전시키면 계속 좌측으로 이동한다.

// percent = percent < 0 ? 0 : percent > 400 ? 400: percent :
// percent는 처음 음수값이다가 섹션이 브라우저 상단에 도달해야 0 이므로
// 브라우저 상단에 섹션이 도달하기 전까지는 해당 섹션을 이동시키기지 않음
// 계속 스크롤하면 percent 가 양수값으로 커지면서 해당 섹션은 좌측으로 이동함
// 스크롤을 계속 올려서 percent 가 400보다 커지면 해당 섹션은 더이상 움직이지 않고 고정됨

// 결국 정리하면 섹션이 브라우저 상단에 닿은 시점부터 스크롤이 내려간 거리만큼 섹션을 좌측으로 이동함
// 섹션이 브라우저 상단에 닿은 시점부터 스크롤이 400vw 만큼 내려가면 수평 스크롤은 멈춤
// 결국 해당 섹션 높이에서 수직스크롤 이동 비율만큼 수평스크롤 거리를 이동시킴 
function transform(section){
    const offsetTop = section.parentElement.offsetTop
    console.log(offsetTop)
    const scrollSection = section.querySelector('.scroll_section')
    let percent = ((window.scrollY - offsetTop) / window.innerHeight) * 100
    percent = percent < 0 ? 0 : percent > 400 ? 400: percent 
    scrollSection.style.transform = `translateX(${-percent}vw)`
}