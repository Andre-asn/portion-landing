// Demo bill, taken from the "Friday lunch" table in the Portion Figma file.
// Shares are computed the way the app does it: tax and tip are split in
// proportion to what each person claimed.

export type PersonId = 'you' | 'priya' | 'marcus' | 'lena'

export interface Person {
	id: PersonId
	name: string
	initials: string
	chip: string
	chipText: string
}

export const people: Record<PersonId, Person> = {
	you: { id: 'you', name: 'You', initials: 'AS', chip: '#ff7733', chipText: '#0f0f12' },
	priya: { id: 'priya', name: 'Priya', initials: 'PK', chip: '#dfe6fb', chipText: '#2f4aa8' },
	marcus: { id: 'marcus', name: 'Marcus', initials: 'MR', chip: '#ebe3fb', chipText: '#5b3fa3' },
	lena: { id: 'lena', name: 'Lena', initials: 'LO', chip: '#d6f1ee', chipText: '#126b62' },
}

export const order: PersonId[] = ['you', 'marcus', 'priya', 'lena']

export interface Line {
	id: string
	name: string
	unit: number
	// One entry per unit on the receipt; null means nobody has claimed it yet.
	claims: (PersonId | null)[]
}

export const TAX = 5.16
export const TIP = 11.8

export const startingLines: Line[] = [
	{ id: 'burrito', name: 'Chicken burrito', unit: 13.5, claims: [null] },
	{ id: 'carnitas', name: 'Carnitas bowl', unit: 14, claims: [null] },
	{ id: 'taco', name: 'Taco al pastor', unit: 4.5, claims: [null, null] },
	{ id: 'quesadilla', name: 'Veggie quesadilla', unit: 11, claims: [null] },
	{ id: 'horchata', name: 'Horchata', unit: 4, claims: [null, null] },
	{ id: 'coke', name: 'Mexican Coke', unit: 3.5, claims: [null] },
]

// The order friends claim lines in when the page loads: [line id, unit index, person].
export const claimScript: [string, number, PersonId][] = [
	['carnitas', 0, 'marcus'],
	['burrito', 0, 'you'],
	['taco', 0, 'priya'],
	['quesadilla', 0, 'lena'],
	['horchata', 0, 'marcus'],
	['coke', 0, 'you'],
	['taco', 1, 'lena'],
	['horchata', 1, 'priya'],
]

export const subtotal = (lines: Line[]) =>
	lines.reduce((sum, line) => sum + line.unit * line.claims.length, 0)

export const total = (lines: Line[]) => subtotal(lines) + TAX + TIP

const claimedBy = (lines: Line[], person: PersonId | null) =>
	lines.reduce((sum, line) => sum + line.unit * line.claims.filter((c) => c === person).length, 0)

// Each person's share in cents, rounded so the shares always add up to the bill total.
export const shares = (lines: Line[]): Record<PersonId | 'unclaimed', number> => {
	const sub = subtotal(lines)
	const factor = total(lines) / sub
	const keys: (PersonId | null)[] = [...order, null]
	const raw = keys.map((k) => claimedBy(lines, k) * factor * 100)
	const cents = raw.map(Math.floor)
	let left = Math.round(total(lines) * 100) - cents.reduce((a, b) => a + b, 0)
	raw
		.map((value, i) => ({ i, rest: value - Math.floor(value) }))
		.sort((a, b) => b.rest - a.rest)
		.forEach(({ i }) => {
			if (left > 0) {
				cents[i] += 1
				left -= 1
			}
		})
	return {
		you: cents[0],
		marcus: cents[1],
		priya: cents[2],
		lena: cents[3],
		unclaimed: cents[4],
	}
}

export const money = (cents: number) => `$${(cents / 100).toFixed(2)}`
export const plain = (dollars: number) => dollars.toFixed(2)
