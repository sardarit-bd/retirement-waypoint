import {
    LayoutDashboard,
    BookOpen,
    ShoppingBag,
    FileText,
    Star,
    User,
    BookMarked,
    ShoppingCart,
    Ticket,
    Sparkles,
    Users,
    Mail,
} from 'lucide-react';

// User menu items with sections
export const userMenuSections = [
    {
        title: 'Main',
        items: [
            { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
            { icon: BookOpen, label: 'My Books', href: '/dashboard/my-books' },
            { icon: ShoppingBag, label: 'Orders', href: '/dashboard/orders' },
        ],
    },
    {
        title: 'Account',
        items: [
            { icon: User, label: 'Profile', href: '/dashboard/profile' },
        ],
    },
];

// Admin menu items with sections
export const adminMenuSections = [
    {
        title: 'Main',
        items: [
            { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
            { icon: BookMarked, label: 'Books', href: '/admin/books' },
            { icon: ShoppingCart, label: 'Orders', href: '/admin/orders' },
            { icon: Star, label: 'Reviews', href: '/admin/reviews' },
        ],
    },
    {
        title: 'Management',
        items: [
            { icon: Ticket, label: 'Coupons', href: '/admin/coupons' },
            { icon: FileText, label: 'Assessments', href: '/admin/assessments' },
            { icon: Users, label: 'Assessment Participants', href: '/admin/assessment-participants' },
            { icon: Mail, label: 'Contact Messages', href: '/admin/contact-messages' },
        ],
    },
    {
        title: 'Account',
        items: [
            { icon: User, label: 'Profile', href: '/admin/profile' },
        ],
    },
];

// Get menu sections based on user role
export const getMenuSections = (isAdmin) => {
    return isAdmin ? adminMenuSections : userMenuSections;
};