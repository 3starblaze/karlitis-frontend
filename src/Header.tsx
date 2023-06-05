import { Menu } from 'antd';

function baseMenuItems() {
    const children = [
      {
        label: "Meklēt",
        href: "#",
      },
      {
        label: "Par mums",
        href: "#",
      },
      {
        label: "Aktualitātes",
        href: "#",
      },
    ];
  
    return children.map((obj: any) => {
      obj['key'] = obj['label'];
      return obj;
    });
  }
  
  function menuItems() {
    let children = baseMenuItems();
    children = children.map((obj) => {
      delete obj['href'];
      return obj;
    });
  
    return [{
      label: '',
      key: 'menu',
      children: children,
    }];
  }
  

function Header() {
    return (
        <header className="bg-custom-blue shadow-md p-4 flex items-center">
            < a href="#" >
                <img
                    src="/karlitis_logo-karlitis.png"
                    className="h-5"
                    alt="Karlitis logo"
                />
            </a >

            {/* Empty space in between */}
            < div className="flex-grow" ></div >

            {/* links */}
            < ul className="hidden lg:flex lg:gap-4" >
                <li className="text-custom-white"><a href="#">Meklēt</a></li>
                <li className="text-custom-white"><a href="#">Par mums</a></li>
                <li className="text-custom-white"><a href="#">Aktualitātes</a></li>
            </ul >

            <Menu
                className="lg:hidden"
                mode="vertical"
                items={menuItems()}
            />

        </header >
    )
}

export default Header;