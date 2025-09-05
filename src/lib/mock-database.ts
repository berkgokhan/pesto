import { Recipe } from '@/types/recipe';

// In-memory mock database
class MockDatabase {
  private recipes: Recipe[] = [];
  private featuredRecipes: Recipe[] = [];
  private tags: string[] = [];

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData(): void {
    // Mock recipe data
    const mockRecipes: Array<Omit<Recipe, 'id' | 'createdAt'>> = [
      {
        slug: 'classic-spaghetti-carbonara',
        title: 'Classic Spaghetti Carbonara',
        description: 'A traditional Italian pasta dish with eggs, cheese, pancetta, and black pepper. Rich, creamy, and absolutely delicious.',
        imageSrc: '/hero.png',
        tags: ['Italian', 'Pasta', 'Comfort Food', 'Quick']
      },
      {
        slug: 'chicken-tikka-masala',
        title: 'Chicken Tikka Masala',
        description: 'Tender chicken pieces in a creamy, spiced tomato sauce. This popular Indian-inspired dish is perfect with basmati rice or naan bread.',
        imageSrc: '/hero.png',
        tags: ['Indian', 'Chicken', 'Spicy', 'Curry']
      },
      {
        slug: 'beef-bourguignon',
        title: 'Beef Bourguignon',
        description: 'A classic French stew made with beef braised in red wine, vegetables, and herbs. Perfect for special occasions.',
        imageSrc: '/hero.png',
        tags: ['French', 'Beef', 'Stew', 'Wine', 'Comfort Food']
      },
      {
        slug: 'mediterranean-quinoa-bowl',
        title: 'Mediterranean Quinoa Bowl',
        description: 'A healthy and colorful bowl with quinoa, fresh vegetables, olives, and feta cheese. Perfect for a light lunch.',
        imageSrc: '/hero.png',
        tags: ['Healthy', 'Vegetarian', 'Mediterranean', 'Quinoa', 'Light']
      },
      {
        slug: 'chocolate-chip-cookies',
        title: 'Perfect Chocolate Chip Cookies',
        description: 'Soft and chewy chocolate chip cookies with a crispy edge. The ultimate comfort dessert that everyone loves.',
        imageSrc: '/hero.png',
        tags: ['Dessert', 'Baking', 'Chocolate', 'Comfort Food', 'Sweet']
      },
      {
        slug: 'thai-green-curry',
        title: 'Thai Green Curry',
        description: 'Aromatic Thai green curry with coconut milk, vegetables, and your choice of protein. Spicy and flavorful.',
        imageSrc: '/hero.png',
        tags: ['Thai', 'Curry', 'Spicy', 'Coconut', 'Asian']
      },
      {
        slug: 'grilled-salmon-teriyaki',
        title: 'Grilled Salmon Teriyaki',
        description: 'Perfectly grilled salmon with homemade teriyaki glaze. Healthy, flavorful, and ready in under 30 minutes.',
        imageSrc: '/hero.png',
        tags: ['Japanese', 'Salmon', 'Healthy', 'Grilled', 'Quick']
      },
      {
        slug: 'margherita-pizza',
        title: 'Classic Margherita Pizza',
        description: 'Simple yet perfect pizza with fresh mozzarella, tomato sauce, and basil. A true Italian classic.',
        imageSrc: '/hero.png',
        tags: ['Italian', 'Pizza', 'Vegetarian', 'Classic', 'Comfort Food']
      },
      {
        slug: 'chicken-parmesan',
        title: 'Chicken Parmesan',
        description: 'Breaded chicken cutlets topped with marinara sauce and melted mozzarella cheese. Served over pasta.',
        imageSrc: '/hero.png',
        tags: ['Italian', 'Chicken', 'Comfort Food', 'Pasta', 'Cheese']
      },
      {
        slug: 'vegetable-stir-fry',
        title: 'Asian Vegetable Stir-Fry',
        description: 'Quick and healthy stir-fry with fresh vegetables and a savory sauce. Perfect for busy weeknights.',
        imageSrc: '/hero.png',
        tags: ['Asian', 'Vegetarian', 'Healthy', 'Quick', 'Vegetables']
      },
      {
        slug: 'beef-tacos',
        title: 'Authentic Beef Tacos',
        description: 'Seasoned ground beef tacos with fresh toppings and homemade salsa. A family favorite for taco night.',
        imageSrc: '/hero.png',
        tags: ['Mexican', 'Beef', 'Spicy', 'Quick', 'Family']
      },
      {
        slug: 'chocolate-lava-cake',
        title: 'Chocolate Lava Cake',
        description: 'Decadent chocolate cake with a molten chocolate center. Perfect for special occasions and chocolate lovers.',
        imageSrc: '/hero.png',
        tags: ['Dessert', 'Chocolate', 'Baking', 'Special Occasion', 'Sweet']
      },
      {
        slug: 'caesar-salad',
        title: 'Classic Caesar Salad',
        description: 'Crisp romaine lettuce with homemade Caesar dressing, croutons, and parmesan cheese. A timeless favorite.',
        imageSrc: '/hero.png',
        tags: ['Salad', 'Healthy', 'Classic', 'Vegetarian', 'Light']
      },
      {
        slug: 'lamb-biryani',
        title: 'Fragrant Lamb Biryani',
        description: 'Aromatic basmati rice layered with spiced lamb and cooked to perfection. A celebration dish from India.',
        imageSrc: '/hero.png',
        tags: ['Indian', 'Lamb', 'Rice', 'Spicy', 'Special Occasion']
      },
      {
        slug: 'pancakes',
        title: 'Fluffy Buttermilk Pancakes',
        description: 'Light and fluffy pancakes perfect for breakfast or brunch. Serve with maple syrup and fresh berries.',
        imageSrc: '/hero.png',
        tags: ['Breakfast', 'Baking', 'Sweet', 'Comfort Food', 'Quick']
      },
      {
        slug: 'ratatouille',
        title: 'Traditional Ratatouille',
        description: 'A classic French vegetable stew with eggplant, zucchini, tomatoes, and herbs. Healthy and delicious.',
        imageSrc: '/hero.png',
        tags: ['French', 'Vegetarian', 'Healthy', 'Vegetables', 'Stew']
      },
      {
        slug: 'chicken-wings',
        title: 'Buffalo Chicken Wings',
        description: 'Crispy chicken wings tossed in spicy buffalo sauce. Perfect for game day or casual gatherings.',
        imageSrc: '/hero.png',
        tags: ['American', 'Chicken', 'Spicy', 'Appetizer', 'Game Day']
      },
      {
        slug: 'mushroom-risotto',
        title: 'Creamy Mushroom Risotto',
        description: 'Rich and creamy risotto with wild mushrooms and parmesan cheese. A luxurious Italian comfort food.',
        imageSrc: '/hero.png',
        tags: ['Italian', 'Vegetarian', 'Rice', 'Comfort Food', 'Creamy']
      },
      {
        slug: 'fish-and-chips',
        title: 'Traditional Fish and Chips',
        description: 'Beer-battered fish with crispy chips. A British classic that\'s perfect for a hearty meal.',
        imageSrc: '/hero.png',
        tags: ['British', 'Fish', 'Fried', 'Comfort Food', 'Classic']
      },
      {
        slug: 'apple-pie',
        title: 'Homemade Apple Pie',
        description: 'Classic American apple pie with flaky crust and cinnamon-spiced apples. Perfect for holidays and family gatherings.',
        imageSrc: '/hero.png',
        tags: ['Dessert', 'Baking', 'American', 'Fruit', 'Holiday']
      },
      {
        slug: 'pad-thai',
        title: 'Authentic Pad Thai',
        description: 'Stir-fried rice noodles with shrimp, tofu, and vegetables in a tangy tamarind sauce. A Thai street food favorite.',
        imageSrc: '/hero.png',
        tags: ['Thai', 'Noodles', 'Asian', 'Quick', 'Street Food']
      },
      {
        slug: 'beef-wellington',
        title: 'Beef Wellington',
        description: 'Tender beef tenderloin wrapped in puff pastry with mushroom duxelles. An elegant dish for special occasions.',
        imageSrc: '/hero.png',
        tags: ['British', 'Beef', 'Special Occasion', 'Elegant', 'Pastry']
      },
      {
        slug: 'greek-salad',
        title: 'Fresh Greek Salad',
        description: 'Crisp vegetables with feta cheese, olives, and olive oil dressing. A refreshing Mediterranean classic.',
        imageSrc: '/hero.png',
        tags: ['Greek', 'Salad', 'Healthy', 'Vegetarian', 'Mediterranean']
      },
      {
        slug: 'chicken-noodle-soup',
        title: 'Homemade Chicken Noodle Soup',
        description: 'Comforting soup with tender chicken, vegetables, and egg noodles. Perfect for cold days or when you\'re feeling under the weather.',
        imageSrc: '/hero.png',
        tags: ['American', 'Chicken', 'Soup', 'Comfort Food', 'Healthy']
      },
      {
        slug: 'tiramisu',
        title: 'Classic Tiramisu',
        description: 'Layers of coffee-soaked ladyfingers and mascarpone cream. A sophisticated Italian dessert that\'s easier to make than you think.',
        imageSrc: '/hero.png',
        tags: ['Italian', 'Dessert', 'Coffee', 'Elegant', 'No-Bake']
      }
    ];

    // Convert to full Recipe objects with IDs and timestamps
    this.recipes = mockRecipes.map((recipe, index) => ({
      ...recipe,
      id: `recipe_${index + 1}`,
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString() // Random date within last 30 days
    }));

    // Extract all unique tags
    const allTags = new Set<string>();
    this.recipes.forEach(recipe => {
      recipe.tags.forEach(tag => allTags.add(tag));
    });
    this.tags = Array.from(allTags).sort();

    // Mock featured recipes
    this.insertFeaturedRecipe({ slug: 'classic-spaghetti-carbonara' });
    this.insertFeaturedRecipe({ slug: 'chicken-tikka-masala' });
    this.insertFeaturedRecipe({ slug: 'beef-bourguignon' });
    this.insertFeaturedRecipe({ slug: 'mediterranean-quinoa-bowl' });
    this.insertFeaturedRecipe({ slug: 'chocolate-chip-cookies' });
    this.insertFeaturedRecipe({ slug: 'thai-green-curry' });
    this.insertFeaturedRecipe({ slug: 'grilled-salmon-teriyaki' });
    this.insertFeaturedRecipe({ slug: 'margherita-pizza' });
    this.insertFeaturedRecipe({ slug: 'chicken-parmesan' });
    this.insertFeaturedRecipe({ slug: 'vegetable-stir-fry' });
    this.insertFeaturedRecipe({ slug: 'beef-tacos' });
    this.insertFeaturedRecipe({ slug: 'chocolate-lava-cake' });
    this.insertFeaturedRecipe({ slug: 'caesar-salad' });
  }

  // Get all recipes
  async getAllRecipes(): Promise<Recipe[]> {
    return [...this.recipes];
  }

  // Get recipe by ID
  async getRecipeById(id: string): Promise<Recipe | null> {
    return this.recipes.find(recipe => recipe.id === id) || null;
  }

  // Get recipe by slug
  async getRecipeBySlug(slug: string): Promise<Recipe | null> {
    return this.recipes.find(recipe => recipe.slug === slug) || null;
  }

  // Get popular/featured recipes
  async getFeaturedRecipes(limit: number = 10): Promise<Recipe[]> {
    return this.featuredRecipes
      .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
      .slice(0, limit);
  }

  // Search recipes with filters
  async searchRecipes(params: {
    query?: string;
    tags?: string[];
    sort?: string;
    limit?: number;
    offset?: number;
  }): Promise<{ recipes: Recipe[], totalCount: number; }> {
    let filteredRecipes = [...this.recipes];

    // Apply search query filter
    if (params.query) {
      const searchTerm = params.query.toLowerCase();
      filteredRecipes = filteredRecipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm) ||
        recipe.description.toLowerCase().includes(searchTerm) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    // Apply tag filter
    if ((params.tags != null) && params.tags.length > 0) {
      filteredRecipes = filteredRecipes.filter(recipe =>
        params.tags!.some(tag => recipe.tags.includes(tag))
      );
    }

    // Apply sorting
    const sortBy = params.sort || 'featured';
    filteredRecipes.sort((a, b) => {
      switch (sortBy) {
        case 'title':
        case 'name':
          return a.title.localeCompare(b.title);
        case 'date':
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        case 'featured':
        default:
          if (this.featuredRecipes.includes(a) && !this.featuredRecipes.includes(b)) return -1;
          if (!this.featuredRecipes.includes(a) && this.featuredRecipes.includes(b)) return 1;
          return a.title.localeCompare(b.title);
      }
    });

    const totalCount = filteredRecipes.length;

    // Apply pagination
    const limit = params.limit || 6;
    const offset = params.offset || 0;
    const paginatedRecipes = filteredRecipes.slice(offset, offset + limit);

    return {
      recipes: paginatedRecipes,
      totalCount
    };
  }

  // Get all tags
  async getAllTags(): Promise<string[]> {
    return [...this.tags];
  }

  // Insert a new recipe
  async insertRecipe(recipe: Omit<Recipe, 'id' | 'createdAt'>): Promise<Recipe> {
    const newRecipe: Recipe = {
      ...recipe,
      id: `recipe_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString()
    };

    this.recipes.push(newRecipe);

    // Update tags
    recipe.tags.forEach(tag => {
      if (!this.tags.includes(tag)) {
        this.tags.push(tag);
      }
    });
    this.tags.sort();

    return newRecipe;
  }

  // Update a recipe
  async updateRecipe(id: string, updates: Partial<Recipe>): Promise<Recipe | null> {
    const index = this.recipes.findIndex(recipe => recipe.id === id);
    if (index === -1) return null;

    const updatedRecipe = { ...this.recipes[index], ...updates };
    this.recipes[index] = updatedRecipe;

    // Update tags if needed
    if (updates.tags != null) {
      const allTags = new Set<string>();
      this.recipes.forEach(recipe => {
        recipe.tags.forEach(tag => allTags.add(tag));
      });
      this.tags = Array.from(allTags).sort();
    }

    return updatedRecipe;
  }

  // Delete a recipe
  async deleteRecipeById(id: string): Promise<boolean> {
    const index = this.recipes.findIndex(recipe => recipe.id === id);
    if (index === -1) return false;

    this.recipes.splice(index, 1);

    // Update tags
    const allTags = new Set<string>();
    this.recipes.forEach(recipe => {
      recipe.tags.forEach(tag => allTags.add(tag));
    });
    this.tags = Array.from(allTags).sort();

    return true;
  }

  async deleteRecipeBySlug(slug: string): Promise<boolean> {
    const id = (await this.getRecipeBySlug(slug))?.id;
    if (!id) return false;
    return await this.deleteRecipeById(id);
  }

  async insertFeaturedRecipe(recipe: Pick<Recipe, 'slug'>): Promise<Recipe | null> {
    const r = await this.getRecipeBySlug(recipe.slug);
    if (!r) return null;
    this.featuredRecipes.push(r);
    return r;
  }

  async removeFeaturedRecipe(recipe: Pick<Recipe, 'slug'>): Promise<boolean> {
    const r = await this.getRecipeBySlug(recipe.slug);
    if (!r) return false;

    this.featuredRecipes = this.featuredRecipes.filter(r => r.slug !== recipe.slug);
    return true;
  }

  // Clear all data
  async clearAllData(): Promise<void> {
    this.recipes = [];
    this.tags = [];
  }

  // Get database stats
  async getStats(): Promise<{ totalRecipes: number, totalTags: number; }> {
    return {
      totalRecipes: this.recipes.length,
      totalTags: this.tags.length
    };
  }
}

// Export singleton instance
export const recipeDb = new MockDatabase();
