import React from 'react';
import './Story.css';

function Story() {
    return (
        <div className="story-page">
            <div className="story-card animated-fade-in">
                <h1 className="story-title">Roadin 이야기</h1>
                <div className="story-divider"></div>
                <p className="story-definition">
                    <span>Roadin</span> = <span>Road</span> (길)
                </p>
                <p className="story-description">
                    '나의 길 안으로 들어가다'라는 상징처럼,
                    <br />
                    Roadin은 당신만의 진로를 탐색하는 여정을 함께합니다.
                </p>
                <div className="story-divider"></div>
                <p className="story-definition">
                    <span>길동이</span> = 함께 <span>길</span>을
                </p>
                <p className="story-description">
                    Roadin의 AI 챗봇 길동이는 여러분의 든든한 동반자로서
                    <br />
                    진로 탐색의 여정을 즐겁게 만들어줄 것입니다.
                </p>
                <blockquote className="story-slogan">
                    "AI 챗봇 길동이와 함께, 당신의 진로 안으로 들어가보세요."
                </blockquote>
            </div>
        </div>
    );
}

export default Story;
