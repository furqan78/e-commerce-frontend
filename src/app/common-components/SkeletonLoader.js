import React from 'react';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const SkeletonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
  width: 200px; /* Set a fixed width for the skeleton box */
`;

const SkeletonElement = styled.div`
  background: #f6f7f8;
  background-image: linear-gradient(90deg, #f6f7f8 0%, #edeef1 50%, #f6f7f8 100%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite linear;
  border-radius: 4px;

  &.image {
    width: 12rem;
    height: 15rem; /* Adjust the height for the image box */
  }

  &.title {
    width: 80%; /* Adjust the width for the title box */
    height: 20px; /* Adjust the height for the title box */
    margin: 10px 0; /* Add some margin for spacing */
  }
`;

const SkeletonBox = () => (
  <SkeletonWrapper>
    <SkeletonElement className="image" />
    <SkeletonElement className="title" />
  </SkeletonWrapper>
);

const SkeletonLoader = ({ count = 5, flexwrap }) => {
  return (
    <div className='flex gap-36 w-full'>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonBox key={index} />
      ))}
    </div>
  );
};

export default SkeletonLoader;
