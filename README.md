### 프로젝트 소개

- 차량 대여 관리 서비스이고, 차량 리스트가 있는 메인페이지, 차량 디테일 페이지가 존재하는 SPA 입니다.
- 메인페이지에는 태그들이 존재하며 태그를 클릭하면 그에 맞는 차량 리스트를 업데이트 해줍니다.
- 디테일페이지는 메인페이지에서 클릭한 차량의 디테일을 보여줍니다.

#### API

- 차량 관련 API를 모아놓은 CarAPI class를 구현하여 관련된 내용을 한곳에서 확인할 수 있습니다.
- BaseURL을 생성자에서 인자로 받아 URL이 바뀌더라도 변경에 용이하게 대응할 수 있습니다.

```javascript
export class CarAPI {
  #API;
  #instance;
  #fuelType;
  #segment;

  constructor(url) {
    this.#instance = createInstance({
      url: url,
      config: {
        timeout: 3000,
      },
    });
    this.#API = CAR_API_URL;
    this.#fuelType = CAR_FUELTYPE;
    this.#segment = CAR_SEGMENT;
  }
  // 차량에 관한 데이터를 요청하는 API 코드들
}

export const carAPI = new CarAPI(BASE_URL);

const Providers = ({ children }) => {
  return (
    <ColorProvider>
      <CarInfoProvider carAPI={carAPI}>{children}</CarInfoProvider>
    </ColorProvider>
  );
};
```

- API 요청 시 사용되는 파라미터 값은 관리하기 편하게 상수화를 했습니다.

```javascript
export const CAR_API_URL = {
  cars: "/cars",
};

export const CAR_FUELTYPE = {
  gasiline: "gasoline",
  hybrid: "hybrid",
  ev: "ev",
};

export const CAR_SEGMENT = {
  small: "C",
  medium: "D",
  large: "E",
  suv: "SUV",
};
```

#### Styled-Components

- reset, 전역적인 스타일은 styled-Component의 GlobalStyle 이용 했습니다.
- rem 단위를 쉽게 맞추기 위해 font-size 는 62.5%를 전역적으로 적용하여 대략 10px 을 1rem 단위로 사용할 수 있게 하였습니다.

```javascript
const GlobalStyle = createGlobalStyle`
 ${reset}
 html { font-size: 62.5%;
	font-family: 'Inter', sans-serif;
 }
 button,a {all:unset}
 div,li{
	box-sizing: border-box;
 }

 #root{
	display:flex ;
	justify-content:center ;
 }
`;
```

- 자주사용되는 color값은 theme를 이용하여 적용 하였습니다.

```javascript
const color = {
  black: "#000000",
  gray: "#d9d9d9",
  blue: "#0094ff",
  white: "#FFFFFF",
};

const bgColor = {
  primary: color.black,
  secondary: color.gray,
  tertiary: color.blue,
};

const fontColor = {
  primary: color.white,
  secondary: color.black,
  tertiary: color.white,
};

const theme = {
  color,
  bgColor,
  fontColor,
};

export default theme;
```
