import React, { ReactElement, ReactNode, cloneElement } from "react";

function Nest(children: ReactNode, component: ReactElement): ReactNode {
	return cloneElement(component, {}, children);
}

export function MultiProvider(props: {
	children?: ReactNode;
	providers?: ReactElement[];
}): ReactNode {
	return <>{props.providers?.reduceRight(Nest, props.children)}</>;
}
