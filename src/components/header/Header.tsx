import { Menu } from "./components/Menu";
import { User } from "./components/User";
import style from "./Header.module.scss";

export function Header() {
  return (
    <header className={style.header}>
      <Menu />
      <h1>Jira</h1>
      <User />
    </header>
  );
}
