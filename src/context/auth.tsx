import backendapi from '@/lib/apiClient';
import React, { ReactNode, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: null | {
    id: number;
    username: string;
    email: string;
  };
  login: (token: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}
//useContectのイメージとしては、createContextで作成
//useContextで呼び出しができる。
const AuthContext = React.createContext<AuthContextType>({//contextはすべてのページで使いたい関数や変数
  user: null,//初期値
  login: () => {},//初期値
  logout: () => {},//初期値
});

export const useAuth = () => {//カスタムフックス　これをpagesファイルで呼び出すことで、AuthContextで定義したものが使えるようになる。
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: AuthProviderProps) => {//login関数の定義など、childrenの型も指定
  const [user, setUser] = useState<null | {
    id: number;
    email: string;
    username: string;
  }>(null);

  useEffect(() => {//最初にリロードしたとき//loginの時と処理はほぼ一緒
    const token = localStorage.getItem("auth_token");
    if (token) {
      backendapi.defaults.headers["Authorization"] = `Bearer ${token}`;

      backendapi
        .get("/users/find")
        .then((res) => {
          // console.log(res.data.user);
          setUser(res.data.user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const login = async (token: string) => {//loginの実際のコード
    //console.log("auth_token");
    localStorage.setItem("auth_token", token);//localsatorageにauth_tokenといった名前のtokenを入れる
    
    backendapi.defaults.headers["Authorization"] = `Bearer ${token}`;//loginしたらapiaClientに//"Authorization":`Beare {token}`を追加

    try {
      backendapi.get("/users/find").then((res) => {
        setUser(res.data.user);//user情報が返ってくるのでuseStateで定義したものに入れる
      });
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");//localsttorageにauth_tokenを消す
    delete backendapi.defaults.headers["Authorication"];//loginしたらapiaClientに//"Authorization":`Beare {token}`を消去
    setUser(null);
  };

  const value = {//loginとlogoutのメソッドをまとめる
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;//valueを指定することでloginやlogtoutが使えるようになる。
};