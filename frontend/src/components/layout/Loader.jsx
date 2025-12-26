import React from "react";
import styled from "styled-components";

const Loader = () => {
  return (
    <Wrapper>
      <div className="loader">
        <span />
        <span />
        <span />
      </div>
      <p>Loading...</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #121212; /* Spotify dark */
  color: #b3b3b3;

  p {
    margin-top: 16px;
    font-size: 14px;
    letter-spacing: 0.5px;
  }

  .loader {
    display: flex;
    gap: 8px;
  }

  .loader span {
    width: 10px;
    height: 10px;
    background: #1db954; /* Spotify green */
    border-radius: 50%;
    animation: bounce 0.6s infinite alternate;
  }

  .loader span:nth-child(2) {
    animation-delay: 0.2s;
  }

  .loader span:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes bounce {
    from {
      transform: translateY(0);
      opacity: 0.6;
    }
    to {
      transform: translateY(-10px);
      opacity: 1;
    }
  }
`;

export default Loader;
