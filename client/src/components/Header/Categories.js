import React, { useState, useEffect } from 'react';
import api from '../../services/api';

export default function Categories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get('/categories');
     
            setCategories(response.data);
        };
     
        fetchData();
    }, []);

    return (
        <nav id="categories">
            <ul>
                {categories.map(category => (
                    <li key={category.id} className="category"><a href="/#">{category.name}</a></li>
                ))}
            </ul>
        </nav>
    );
}
