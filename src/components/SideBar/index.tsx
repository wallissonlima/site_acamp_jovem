import { useState } from "react";
import { Menu, X } from "lucide-react";
import {
    SidebarContainer,
    SidebarHeader,
    SidebarMenu,
    SidebarItem,
    ToggleButton,
    Overlay,
} from "./styles";


interface ProductFilterProps {
    categories: string[]; // categorias de produtos
    onFilter: (category: string) => void; // função para aplicar filtro
}

export const SideBar = ({ categories, onFilter }: ProductFilterProps) => {
    const [open, setOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState<string>("Todos");

    const toggleSidebar = () => setOpen(!open);

    const handleFilter = (category: string) => {
        setActiveCategory(category);
        onFilter(category);
    };

    return (
        <>
            {/* Botão hambúrguer */}
            <ToggleButton onClick={toggleSidebar}>
                {open ? <X size={28} /> : <Menu size={28} />}
            </ToggleButton>
            {open && <Overlay onClick={toggleSidebar} />}
            <SidebarContainer open={open}>
                <SidebarHeader>
                    <h2>Produtos</h2>
                </SidebarHeader>
                <SidebarMenu>
                    {/* Categoria "Todos" */}
                    <SidebarItem
                        onClick={() => handleFilter("Todos")}
                        className={activeCategory === "Todos" ? "active" : ""}
                    >
                        Todos
                    </SidebarItem>
                    {/* Outras categorias */}
                    {categories.map((cat) => (
                        <SidebarItem
                            key={cat}
                            onClick={() => handleFilter(cat)}
                            className={activeCategory === cat ? "active" : ""}
                        >
                            {cat}
                        </SidebarItem>
                    ))}
                </SidebarMenu>
            </SidebarContainer>
        </>
    );
};
