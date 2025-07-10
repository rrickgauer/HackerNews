


export function urlGetQueryParm(key: string): string | null;
export function urlGetQueryParm(key: string, url: URL): string | null;
export function urlGetQueryParm(key: string, url?: URL): string | null
{
    url ??= new URL(window.location.href);
    return url.searchParams.get(key);
}



export function urlGetPathSectionValue(index: number): string;
export function urlGetPathSectionValue(index: number, url: URL): string;
export function urlGetPathSectionValue(index: number, url?: URL): string
{
    url ??= new URL(window.location.href);

    const pathSections = url.pathname.split('/');
    return pathSections[index + 1];
}


export function navigateToPage(url: URL, newTab?: boolean): void;
export function navigateToPage(url: string, newTab?: boolean): void;
export function navigateToPage(url: URL | string, newTab?: boolean): void
{
    if(url instanceof URL)
    {
        url = url.toString();
    }

    newTab ??= false;

    if(newTab)
    {
        window.open(url, '_blank');
    }
    else
    {
        window.location.href = url;
    }
}


