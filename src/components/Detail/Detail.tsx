import React, { useState, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Header from '../Reuse/Header';

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { task } = location.state || { task: '할 일을 선택해주세요.' }; // 기본값 설정

  const [image, setImage] = useState<File | null>(null); 
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [memoText, setMemoText] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    } else {
      alert('이미지 파일만 선택할 수 있습니다.');
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleMemoChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMemoText(event.target.value);
  };

  return (
    <div className="mainWrap">
      <Header />
      <div className="detailWrap">
        <div className="todoList">
            <div className="checkBox"></div>
            <h6>{task}</h6>
        </div>
        <div className="detailInner">
            <div className="imgUpload">
            {!image && (
                <input
                ref={fileInputRef}
                className="ImgSpaceInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                />
            )}
            <div>
                {image && (
                <div
                    className="ImgSpace"
                    style={{
                    backgroundImage: imageUrl ? `url(${imageUrl})` : '',
                    }}
                />
                )}
            </div>
            <button
                className={image ? 'ModifyAddImg' : 'addImgBtn'}
                onClick={handleButtonClick}
            ></button>
            </div>
            <div className="txtMemo">
            <div className="memoImg">
                <h4 className="memoTitle">Memo</h4>
                <textarea
                className="txtInput"
                value={memoText}
                onChange={handleMemoChange}
                />
            </div>
            <div className="moFixBtn">
                <button className="FixedBtn">수정 완료</button>
                <button className="modifyBtn">삭제하기</button>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
