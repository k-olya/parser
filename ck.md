# Concatenative K


---

- [Introduction](#Introduction)
- [Why?](#Why?)
- [cK datatypes are K datatypes](#cK datatypes are K datatypes)
- [cK glyphs are K verbs](#cK glyphs are K verbs)
- [K adverbs are cK words](#K adverbs are cK words)
- [K system functions are cK words](#K system functions are cK words)
- [cK words are Joy operators + K adverbs + K system functions + cK operators](#cK words are Joy operators + K adverbs + K system functions + cK operators)
- [cK notation is Joy notation + dictionaries + functions](#cK notation is Joy notation + dictionaries + functions)
- [Named Parameters](#Named Parameters)
- [Evaluation](#Evaluation)
- [Projection](#Projection)
- [Quotation](#Quotation)
- [Set, Def, Get, Use](#Set, Def, Get, Use)
- [Represent, Execute](#Represent, Execute)
- [Windows, Files, Messages](#Windows, Files, Messages)
- [Sets](#Sets)
- [Operation](#Operation)
- [Scripts](#Scripts)
- [Errors](#Errors)
- [Performance](#Performance)
- [Implementation](#Implementation)
- [Applications](#Applications)
- [Open Questions](#Open Questions)

## [Introduction](#)

[cK](../k/ck.k) is a [Joy](http://www.latrobe.edu.au/philosophy/phimvt/joy.html)-style concatenative syntactic overlay for the [K](http://www.kx.com) programming language.

The datatypes of cK are those of K.

In cK, symbols denote K verbs.  As in K, a single symbol denotes a dyadic function (e.g. + is addition, x + y) while the compound glyph '+:' denotes a monadic function (in this case 'flip' or transposition, +x).  Additionally, the compound glyph '+.' denotes the commute of the dyadic function (2 3 -. is 3-2).

The cK keywords fall into three classes: those which correspond to Joy operators and combinators, those which are used for the adverbs of K and miscellaneous K system functions, and those which denote operators new to cK.

cK notation is Joy notation, extended to include dictionaries and functions.

## [Why?](#)

*Differences:*

|                           | K                              | Joy               |
| ------------------------- | ------------------------------ | ----------------- |
| **Lists**                 | Eager                          | Lazy              |
| **Programs**              | Lambdas                        | Quotations        |
| **Evaluation**            | Application (.)                | Disquotation (i)  |
| **Construction**          | Atomic ({})                    | Concatenation (,) |
| **Arities**               | 0, 1, 2, ..                    | 1                 |
| **Named Parameters**      | Yes                            | No                |
| **Assignment/Reference**  | Yes                            | No                |
| **Syntax**                | [Infix, Prefix](../k/kparse.k) | Postfix           |
| **Primitives**            | Atomic + List                  | Scalar            |
| **Iterators**             | Yes                            | No                |
| **Recursors**             | No                             | Yes               

## [cK datatypes are K datatypes](#)

```q

1	integer atom		10 -1 0N 0I
2	float atom		10. .2 10.3 4.376447e-005 0i 0n
3	character atom		'a
4	symbol atom		`abc `"0* "
5	dictionary atom		([`a 10][`b 20][`c 30]) ([`d 40]) ()
6	null atom		N
7	function atom		+ #:
0	list			[] [0] [[1]] [`a "bcd" 30.2]
-1	integer vector*		[1 2 3 4] [5] I
-2	float vector*		[1.1 2.2 3.3 4.4] [5.5] F
-3	character vector*	"abcdef" "g" "" C
-4	symbol vector*		[`a`b`c] [`d] S
```

cK does not implement Joy sets.

\* except for non-atomic strings, cK does not implement K vector notation.

## [cK glyphs are K verbs](#)

K verbs, both monadic and dyadic, are represented in cK by glyphs.

```q
~	match			~:	not
!	rotate, mod		!:	enumerate
@	at			@:	atom
#	take			#:	count
$	cast			$:	format
%	divide			%:	reciprocal
^	power			^:	shape
&	min, logical and	&:	where
*	multiply		*:	first
_	cut, drop		_:	floor
-	subtract		-:	negate
+	add			+:	flip
=	equal			=:	group
|	max, logical or		|:	reverse
,	join			,:	enlist
.	of			.:	value
/	integer divide*		/:	integer reciprocal**
<	less			<:	up
>	more			>:	down
?	find			?:	unique
:	right			::	identity
```

cK redefines two more K symbols:

```q
\ x	comment
\x	quotation
;	quiet, line separator
```

A third form v. denotes the commute of the dyadic function.  For example, 2 3 -. is 3-2. 

\* / is over in K.   
\*\* /: is each-right in K

## [K adverbs are cK words](#)

In cK, the K adverbs are denoted by reserved words:

```q
'	each
/	iterate, transit, do, while, converge
\	Iterate, Transit, Do, While, Converge
':	prior
/:	right
\:	left
```

## [K system functions are cK words](#)

K system functions are verbs of the form \_xyz. In cK, we drop the initial underscore:

```q
log exp abs sqr sqrt floor dot mul inv 
sin cos tan asin acos atan sinh cosh tanh
ci ic
hash
draw
in lin bin binl
dv di dvl
sv vs
sm ss ssr
```

## [cK words are Joy operators + K adverbs + K system functions + cK operators](#)

Joy primitives are implemented as keywords, as noted in the following list.  

Some cK words behave differently than their Joy counterparts.  For example, in cK 'name' takes a program and returns a list whose terminals are symbols.  The structure of the list mirrors that of the program.  A future version of this document will contain detailed specifications for each primitive.

### Constants

```q
N			_n		[] first	null atom
I			!0		0 !:		empty integer vector
F			0#0.		0 0. #		empty float vector
C			""		""		empty character vector (string)
S			0#`		0 ` #		empty symbol vector
```

### Transcendental

```q
acos
asin
cos
cosh
sin
sinh
atan
tan
tanh
```

### Math

```q
abs
dot
floor
inv
log
mul
sqr
sqrt
```

### System

```q
bd			bytes <- data
bin			binary search: list atom
binl			binary search: list list
ci			char <- int
db			data <- bytes
di			delete index
draw			random draw
dv			delete value: list atom
dvl			delete value: list list
ic			int <- char
in			membership: atom list
lin			membership: list list
sm			string match
ss			string search
ssr			string search replace
sv			scalar <- vector (encode)
vs			vector <- scalar (decode)
```

### Inverse

```q
inverse2		f?x
inverse3		?[f;x;y]
```

### Amend

```q
amend3			@[v;i;f]
amend4			@[v;i;f;d]
dmend3			.[v;i;f]
dmend4			.[v;i;f;d]
```

### Program

```q
body			`program body -> list
code			[2 +] code -> "[2 +]"
name			[program] name -> `program
```

### Function

```q
enclose			[* +] enclose -> {* +}
disclose		{* +} disclose -> [* +]
```

### Assignment

```q
def			a`name def -> name:a
get			`v get -> v
set			a`name def -> name:,a
```

### Execute

```q
ck			execute cK string
CK			execute cK string in dictionary
```

### GUI

```q
hide			`hide$
show			`show$
```

### Adverbs

```q
converge		p/a
Converge		p\a
do			n p do/a (Joy 'times')
Do			n p do\a
each			(p'). a
iterate			(p/). a
Iterate			(p\). a
left			a p\:b
prior			p': a
right			a p/:b
transit			i m/v
Transit			i m\v
while			b p/a
While			b p\a
```

### Notation

```q
dictionary		([`a 10][`b 20][`c 30]) -> [[`a 10][`b 20][`c 30]] dictionary
let			[[a]p] -> [[a]p] let
pick			 1 2 3 [[4 5 6][7 8 9 10 11]] [a[b[c d E]]] pick -> 1 2 3 [4 5 6] 7 8 [9 10 11]
shuffle			... "a[b]c:[c]b[a]" shuffle
```

### Polyadic

```q
list			c list: group top +/c elements by c
ndup			s -> s,s[n], <0 from the front, >-1 from the end
npop			s -> n _ s
unlist			n unlist: raze top n elements
```

### Control

```q
displaywidth		width and direction of display (default = -100)
displaycount		number of stack items displayed (default = 0I)
evaluate			0 (Joy behavior) 1 (keep evaluating stack converges)
help			(not yet implemented)
signal			"message" signal -> '"signal: message"
space			emit size of stack in bytes
stop			: to continue
time			emit elapsed time (_T)
trace			N|width_direction trace
trap			0 trap (default) or 1 trap (catch error signals)
```

### I/O

```q
async			x 3:y
connect			3:(host;port)
disconnect		3:handle
disconnected		.m.c
print			print top of stack
read0			0:x
read1			1:x
read2			2:x
read6			6:x
run			"script.ck" run
sync			x 4:y
sysin			0:`
sysout			`0:,:
type			4:x
write0			x 0:y
write1			x 1:y
write6			x 6:y
```

### Miscellaneous

```q
prototype		*0#
```

### [Joy:](http://www.latrobe.edu.au/philosophy/phimvt/joy/plain-manual.html)

### Literal

```q
false			0
true 			1
```

### Predicate

```q
equal			~
has			{y _in x}
in			_in
null			0=#x or x _in (0;0.)	
small			2>#x or x _in (0;0.;1;1.)
```

### Index

```q
at			@
of			@. 
```

### Operator

```q
and			&
div			/
max			!
min			&
not			~:
or			|
pred			-1+
rem			!
sign			{(-x<0)+0<x}
succ			1+ 
```

### Structure

```q
case			x [..[x y]..] -> y
choice			:[x;y;z]
compare			x<=y -> -1, x=y -> 0, x>=y -> 1
concat			,
cons			(,x),y
drop			_.
dup			.. x -> .. x x
dupd			.. x y -> .. x x y
enconcat		.. x y z -> y,(,x),z
first			*:
flatten			,/
id			::
opcase			y [..[x xs]..] -> [xs], x is the type of y
popd			.. x y -> .. y
pop			.. x -> ..
popop			.. x y -> ..
rest			1_
reverse			|:
rollup			-1!(x;y;z)
rolldown		1!(x;y;z)
rollupd			@[(x;y;z;w);2 0 1 3]
rolldownd		@[(x;y;z;w);1 2 0 3]
rotate			@[(x;y;z);2 1 0]
rotated			@[(x;y;z;w);2 1 0 3]
size			#:
swap			@[(x;y);1 0]
swapd			@[(x;y;z);1 0 2]
swoncat			,.
swons			(,y),x
take			#.
transpose		+:
uncons			(*x;1_ x)
unit			,:
unswons 		(1_ x;*x)
zip 			+(x;y)
```

### Combinator

```q
all
app1
app11
app12
apply			[..a..][..p..] -> ..r.. (apply each p to each a, leave each r)
b
binary
binrec
branch
cleave
cond
condlinrec
condnestrec
construct
dip
dipd
dipdd
filter
fold
genrec
i
ifte
infra
linrec
map
nullary
primrec
some
split
step
tailrec
ternary
times			do
treemap
treemap2
treestep
treerec
treegenrec
unary
unary2
unary3
unary4
y
x 
```

### Stack

```q
newstack		.. -> []
stack			.. -> [..]
unstack			.. [--] -> -- 
```

### Continuation

```q
callc
callcc
conts
```

## [cK notation is Joy notation + dictionaries + functions](#)

### Lists and Strings

Joy notation for lists is:

```q
[]		empty list
[1]		unit list (K integer vector)
[1 2.2 3]	list of three (not a K float vector)
```

Joy notation for characters and strings:

```q
'a		a single character scalar
"a"		unit string (K character vector)
"abc"		string of three
```

But cK and Joy treat characters and strings differently:

A joy string is a leaf (i.e., an atom), not a list:

```q
"abc" leaf .
true
"abc" list .
false
```

Yet it has a size (i.e. a count) and it can be taken apart using list operators such as 'first':

```q
"abc" size .
3
"abc" first .
'a
```

In cK, a string is a list of characters.

```q
"abc" first
'a
```

```q
'a'b'c
'a'b'c
first
'a'b'c
```

A string is a list of characters. But cK also supports K symbols:

```q
`a `b `c
`a `b `c
```

```q
[`a`b`c]
[`a `b `c]
```

### Functions

cK supports notation for function-definition:

```q
1 2 3 4 \{+ *}
1 2 3 4 {+ *}
i
1 20
```

{+ \*} is a function-atom, not a list:

```q
{+ *} @:
1
```

Functions are executed immediately:

```q
2 3 4 {* +}
14
```

{..} should be thought of as a method for defining new primitives.

{..} is just notation. The underlying operations are:

```q
[+ *] enclose
{+ *}
disclose
[+ *]
```

The disclose of a primitive is an atom:

```q
[+] first disclose
+
```

The disclose of a defined function is a list:

```q
[{+}] disclose
[+]
```

The enclose of the empty list is the empty function:

```q
[] enclose
{}
```

Semantically, it is identical to the identity function:

```q
10 20 30 {}
10 20 30
```

Functions can be concatenated to form new functions:

```q
[{* +}] first disclose [{- /}] first disclose concat enclose
{+ * - /}
```

or:

```q
[concat [first disclose] map flatten enclose first] `fconcat def pop
[{+ *}] [{- /}] fconcat
{[+ * - /]}
```

Example:

```q
2 3 4 5 [[{+ *} {- %}] {+ - %}]
2 3 4 5 [[{+ *} {- %}] {+ - %}]
[i] treemap
2 3 4 5 [[27 -3.0] -0.3333333]
```

### Dictionaries

cK also supports recursive dictionary formation:

```q
([`x ([`a 10][`b 20])][`y 30 ([`z 40][`w 50])])
([`x ([`a 10 N] [`b 20 N]) N] [`y 30 ([`z 40 N] [`w 50 N])])
```

Dictionary notation is pure syntactic sugar:

```q
[[`a 10][`b 20]]dictionary
([`a 10 N][`b 20 N])

10 20 30 [[`x`y`z] x y + z -]let
0
```

## [Named Parameters](#)

cK does not support true lambdas - functions with persistent, multiple, named parameters - but it does provide two mechanisms for mapping stack items to temporary names.

### "Let"

The 'let' combinator:

```q
10 20 30 [[`x`y`z] x y + z -] let
0
10 [20 30 40] 50 [[`x [`a`b`c]`y]x y b c a + - * %] let
-0.006666667
```

The first component of a let is a pattern-list.  A pattern-list is a list, possibly nested, whose terminals are symbols.  Necessarily, the list of symbols out of which the pattern-list is built contains no duplicates:

```q
(,//pattern-list)~?,//pattern-list)
```

The rest of the list is a program in which elements of ,//pattern-list occur.  Values are picked off the stack according to the structure implied by the pattern-list and substituted as literal values in the named positions of the program.  For example, the let

```q
[[`a [`b `c]] a b + a c + *] let
```

applied to the stack

```q
... 2 [3 4]
```

maps 2 to a, 3 to b, and 4 to c.  Following substitution, the program to be executed is:

```q
[2 3 + 2 4 *]
```

Symbols which cannot occur in a pattern-list:  those corresponding to cK constants:

```q
`N `I `F `C `S `true `false
```

Since the atoms of a pattern-list must be symbols, \` may be elided:

```q
[[a [b c]] a b + a c + *] let
```

No semi-globals, no K-style closures:

```q
[[a b]a a b + [[s a] s a -] let] let
```

The 'a' in the embedded let is the sum of a and b in the embedding let.

Further examples can be found [here](../k/ck/ack.ck). \*

\* Thanks to Nick Forde for the implementations of Ackerman's function.

### Stack-patterns

A second name-method, stack-patterns can be used in conjunction with the shuffle operator 'shuffle'\*:

```q
10 20 30 "abc:cba" shuffle
30 20 10
```

Either side of a stack-pattern can be nested:

```q
10 [20 30] 40 "a[bc]d:b[da]c" shuffle
20 [40 10] 30
```

An upper-case letter can be used to match the rest of a list:

```q
[1 2 3][4 5 6][7 8 9]"[aA][bB][cC]:[A][B][C]abc" shuffle
[2 3] [5 6] [8 9] 1 4 7
```

\* Thanks to William Tanksley, who suggested inclusion of simple (i.e. non-nested) stack-patterns.

## [Evaluation](#)

cK input consists of a sequence of verbs:

```q
7 3 +
```

is the sequence "push 7, push 3, add".

The stack is a list whose members are values:

```q
7 3 [+] first
```

pushes 7, 3, the list (or quotation) [+], and then takes the first element of the list and pushes that onto the stack. So the stack is

```q
7 3 +
```

whose members are 7, 3, and addition.

For non-functions x, 'x' is a verb which pushes x onto the stack. But the only way we can push a function f onto the stack is by pushing its quotation [f] onto the stack, and then disquoting it.

Clearly, cK contains first-class function atoms, as the following argument shows:

```q
[+] first dup
+ +
~
1
```

Match (\~) takes two pieces of data x and y and returns 1 if they match. Hence + + must be two pieces of data. Neither one is a list, so they must be atoms. They're not integers, floats, characters, or symbols, so they must be functions. So cK has first-class function atoms. We just don't have a direct way to push them onto the stack.

Now consider

```q
2 3 [+] first
2 3 +
```

2 is pushed on the stack, then 3, then the quotation [+]. The interpreter then finds the operator 'first' and applies it, leaving the unquoted primitive + on the stack.

Some Joy programmers have expressed discomfort with this behavior. It would appear that something like the following principle is assumed: if the stack S is .. x .., then it should be possible to create S by a sequence of pushes only.

Alternatively, we can prevent an unquoted primitive from ever appearing on the stack by implementing the following behavior: keep evaluating the stack, item-at-a-time, until we get the same result twice-in-a-row.

In cK, the default behavior matches Joy. But we can turn on the self-pushing behavior:

```q
N evaluate
0
1 evaluate
[2 3 +] unstack
5
```

Running under the alternate evaluation regime can result in some spectacular chain-reactions, e.g.:

```q
1 evaluate
-30 trace
[[2 3 + pop] unstack] unstack
[[2 3 + pop] unstack]
[[2 3 + pop] unstack]       unstack
[2 3 + pop]
[2 3 + pop]       unstack
2
2       3
2 3       +
5
5       pop
```

## [Quotation](#)

Billy Tanksley has persuaded me that it makes sense to add a unary quotation operator:

```q
2 3 \+
2 3 +
```

The escape symbol "\" has been extended: \xyz is a comment if x is blank, else \xyz pushes xyz on the stack. 

In Joy, a combinator like 'map' takes one or more programs as arguments. Programs are required to be lists:

```q
[[10][10 20][30 40 50]][size] map .
[1 2 3]
```

In cK, 'map' will accept any of the following:

```q
[[10][10 20][30 40 50]] [size] map	\ list
[1 2 3]
[[10][10 20][30 40 50]] \{size} map	\ function
[1 2 3]
[[10][10 20][30 40 50]] \size map	\ primitive
[1 2 3]
```

Quotation inside a list is redundant, since lists are quotations:

```q
[2 3 \+]
[2 3 +]
```

The quotation mark "\" is purely syntactic, and has an effect only at the top level of the input queue.

## [Projection](#)

Stack underflow cannot occur in cK. If the stack is too short for the execution of a pending primitive, a function is constructed on the fly consisting of the stack concatenated to the primitive, enclosed, and the defined program becomes the new stack. For example,

```q
2 +
{2 +}
```

This can be useful:

```q
2 + 3 swap i
5
```

If the underflow occurs in the course of evaluating a constructed program, the primitive is projected and the resulting partially-evaluated program becomes the new stack:

```q
[2 + *] `add2mul def;
newstack
3 add2mul
{5 *}
4 swap i
20
```

## [Set, Def, Get, Use](#)

To define a program in Joy:

```q
add2 == 2 +
```

To define the same program in cK:

```q
[2 +] `add2 def
```

And then:

```q
3 add2
`add2 5
[add2] name
`add2 5 `add2
get
`add2 5[2 +]
```

The 'set' operation adds a further level of enclosure to the object:

```q
[3 +]`add3 set
`add3
7 add3
`add3 7[3 +]
i
`add3 10
```

## [Represent, Execute](#)

Represent a list as a string of cK code:

```q
[2 +] code
"[2 +]"
```

Execute a string of cK code:

```q
3 "2 +" ck
5
```

Execute cK in a dictionary:

```q
([`aa 10][`bb 20]) `dd def;
`dd "aa bb +" CK
30
```

Execute a string of K code:

```q
"!3" .:
[0 1 2]
```

Execute K in a dictionary:

```q
([`aa 10][`bb 20]) `dd def;
`dd "aa+bb" .
30
```

## [Windows, Files, Messages](#)

Limited K GUI (Windows only, no functional attributes): 

```q
1000000 2 draw [-1 1] of 2 [[+] Iterate] do `crw def;
`chart `crw..c def;
`crw show;
`crw hide;
```

Limited file operations:

```q
d:\ck>k ck
K 2.95t 2002-10-09 Copyright (C) 1993-2002 Kx Systems

\ for k, \\ to exit, .ck.i() for cK
[1 2 3]"d:/123" def
"d:/123"
\\
```

```q
d:\ck>k ck
K 2.95t 2002-10-09 Copyright (C) 1993-2002 Kx Systems
```

```q
\ for k, \\ to exit, .ck.i() for cK
"d:/123" get
[1 2 3]
```

Default file extension is ".cl".

0: 1: 2: 6: are read0, write0, read1, write1, read2, read6, write6.

Asynchronous messages:

```q
[`host`port] [2 3 + print] async	\ prints 5 at `host port console
```

Synchronous messagse:

```q
[`host port] [2 3 +] sync 5 *
25
```

Connect:

```q
[`host port] connect
12
```

Disconnect:

```q
12 disconnect
```

Disconnected:

```q
"stop" disconnected		\ _w is on the stack
```

## [Sets](#)

Joy has sets, but K, and hence cK, does not. But we can simulate them: for any list L, L ?:, the unique elements of L, is a cK-set. [A demonstration script](../k/ck/set.ck) of elementary cK-set operations shows how we can recover basic functionality.

```q
32 !:			`U 		set;
[U swap dvl]		`complement	def;
[, ?:] 			`union		def;
[dup rotate lin &: at] 	`intersect	def;
```

```q
[1 2 3] complement
[0 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31]
[1 2 3 4 5 0] intersect
[4 5 0]
[4 5 6 7 8] union
[4 5 0 6 7 8]
```

By default, the universe is 0 through 31 (to match Joy), but it can be set to a list of arbitrary (but unique) elements.

## [Operation](#)

To operate, download and install both [K](http://www.kx.com) and the script for [cK](../k/ck.k), and from within a command shell say 'k ck':

```q
d:\ck>k ck
K 2.95t 2003-02-20 Copyright (C) 1993-2003 Kx Systems
```

```q
\ for k, \\ to exit, .ck.i() for cK
```

The cK interpreter prompts with two spaces.

```q
10 20 30 [`a "bcd" 'x 20.3] 4444
-0.006666667 10 20 30[`a "bcd" 'x 20.3]4444
```

Default display settings:

```q
N displaywidth
-100
N displaycount
0I
N trace
0
```

Stack too large to display:

```q
1000 !:
.. 975 976 977 978 979 980 981 982 983 984 985 986 987 988 989 990 991 992 993 994 995 996 997 998 999]
```

Setting < 0 places the top of the stack at the right, setting > 0 reverses the stack orientation.

Printing elements of the stack on separate lines of the display:

```q
[1 2] 3 [4 5 6 7] stack dup [print] map unstack;
[1 2]
3
[4 5 6 7]
```

Monitor time/space:

```q
.. time ..
.. 
t:x.y [in seconds]
..
```

```q
.. space ..
..
s:x [stack-size in bytes]
..
```

Trace computation:

```q
-30 trace
100 !: 10 20 30 40 +-*
100
100                                     !:
.. 90 91 92 93 94 95 96 97 98 99]       10
.. 91 92 93 94 95 96 97 98 99] 10       20
.. 92 93 94 95 96 97 98 99] 10 20       30
.. 93 94 95 96 97 98 99] 10 20 30       40
.. 94 95 96 97 98 99] 10 20 30 40       +
.. 93 94 95 96 97 98 99] 10 20 70       -
.. 2 93 94 95 96 97 98 99] 10 -50       *
.. 8 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 88 89 90 91 92 93 94 95 96 97 98 99] -500
```

Temporarily suppress stack display by appending a semicolon to the input:

```q
2 3 +
5
3 4 +;
4 5 6 +
5 7 4 11
```

A semicolon alone is equivalent to 'newstack' (and much more convenient when interacting with cK):

```q
10 20 30
10 20 30
;

```

Permanent suppression:

```q
0 displaycount
2 3 +
4 5 *
0I displaycount
5 9
```

Start cK and load .ck scripts sequentially:

```q
d:\ck>k ck test1 test2 test3
```

Escape cK to K:

```q
\
2+3
5
```

Call cK from K:

```q
.ck.x"10 20 30 +"	\ return stack
10 50
```

Arithmetic and comparison operators are not defined for character data.  For the Joy

```q
'a 1 +
```

use

```q
'a ic 1 + ci
```

Single-line comment begins at \:

```q
2 3 + 4 - \ this is ignored
1
```

cK names are dotted K names, but unlike K, underscore cannot occur in a name:

```q
10 `number_ten set
type error
```

## [Scripts](#)

cK scripts are text files with default extension .ck.

The line separator is ';':

```q
[this is
a
program] `myprog def;
```

Escape script evaluation with a double backslash:

```q
\\
anything
can
go
below
```

## [Errors](#)

Apart from K errors, there is only one run-time cK error:

```q
[2 +] `dup def
reserved word error
```

cK words cannot be redefined.

There is one parse-time error:

```q
[2 3]]
syntax error: unbalanced []s
```

An error can be signalled:

```q
"uh oh" signal
signal: uh oh
```

Programmed stop:

```q
2 3 4 [+ stop -] i
program stopped -- s = stack, : to resume
{[s]pstop[];s}
^
>  s
2 7
>  :
:
-5
```

By default, an error interrupts the interpreter:

```q
"a" 2 +
type error
{:[-3=4:y;{x[y]}/[x;y];x . y]}
^
>  x
+
>  y
("a";2)
>  / we're in k at this point
>  \
2 3 +
5
```

Use 'trap' to prevent interrupts:

```q
1 trap
"a" 2 +
type error
3 4 +
7
```

## [Performance](#)

cK should match K.

```q
1000000 100 draw dup <: at; time;
t:3.255209e-006
```

Expressions which evaluate to K compositions in verb position are fed to adverbs as K expressions:

```q
1 1000000 [1-] do -> 1000000 {-[x;1]}/1  	\ optimized: note reversed order
... 1000000 [*+] do -> 1000000 E[;...]/s	\ not optimized
```

## [Implementation](#)

cK consists of \~ 400 lines of K.

### Architecture

The basic process steps in the interpreter are:

```q
p:.ck.p i			/ takes a string of cK and returns a parse tree
s:.ck.e p			/ takes a parse tree, evaluates it, and returns a stack
d:.ck.d s			/ takes a stack and returns a string of cK
```

Here is an example:

```q
i:"[1 2 3]reverse first !:"
p:.ck.p i
s:.ck.e p
d:.ck.d s
p
(1 2 3
{:[z~0;x;z~1;.$x;7=4:y;y z;E[z;y]]}[`"|:";{((-x)_ z),,dot[y;(-x)#z]}[1][|:]]
{:[z~0;x;z~1;.$x;7=4:y;y z;E[z;y]]}[`"*:";{((-x)_ z),,dot[y;(-x)#z]}[1][*:]]
{:[z~0;x;z~1;.$x;7=4:y;y z;E[z;y]]}[`"!:";{((-x)_ z),,dot[y;(-x)#z]}[1][!:]])
s
,0 1 2
d
"[0 1 2]"
```

p is a list whose first element is the vector 1 2 3, and whose second, third, and fourth elements are the primitives reverse, first, and !:.

### Parsing

The cK parser consists of two components:  string -> tokens and tokens -> types.

Tokenization takes a string and returns a list, possibly nested, of tokens:

```q
token"[2 3][-: [1+]] [i] right"
((,"2"
,"3")
("-:"
(,"1"
,"+"))
,,"i"
"right")
```

A representation of a list of items is tokenized as a list of item-representations, e.g. "[2 3]" is tokenized as (token"2";token"3").

Typing takes a token-list and recursively replaces tokens with corresponding types.  For example:

```q
:t:type token"[2 3][-: [1+]] [i] right"
(2 3
({:[z~0;x;z~1;y 1;z~2;y 0;~7=4:y;E[z;y];y z]}[`"-:";{:[@z;(x;y)z;x>#z;pro[y;z];{y,,dot[x;z]}[y]. cut[x;z]]}[1][-:]]
(1;{:[z~0;x;z~1;y 1;z~2;y 0;~7=4:y;E[z;y];y z]}[`"+";{:[@z;(x;y)z;x>#z;pro[y;z];{y,,dot[x;z]}[y]. cut[x;z]]}[2][+]]))
,{:[z~0;x;z~1;y 1;z~2;y 0;~7=4:y;E[z;y];y z]}[`i;{:[@z;(-x+1;y)z;x>#z;pro[y;z];{dot[x[y];z]}[y]. cut[x;z]]}[1][{[s;p]E[s;p]}]]
{:[z~0;x;z~1;y 1;z~2;y 0;~7=4:y;E[z;y];y z]}[`right;{:[@z;(x;y)z;x>#z;pro[y;z];{y,,dot[x;z]}[y]. cut[x;z]]}[3][{:[_n~p:p2 z;{F[(y;z);x]}[z;x]'y;x p/:y]}]])
```

In this example, the list t contains four components.  t 0 is the vector (list) 2 3.  t 1 is a list of the two cK functions -: and [1+].  t 2 is a one element list of the i function, and t 3 is the right function.  Schematically:

```q
(2 3;(-: (1;+));(i);right)
```

cK functions, whether K verbs or Joy words, are projections of the triadic cK function o.  This function is the heart of cK evaluation, so let's get to know it.

o has three arguments.  

The first argument x is always a symbol of the function it will compute.  For example, \`"+" or \`first.

The second argument y is either a function or a list.  If it is a function, then it is the projection of one of the cK wrapper functions.  If it is a list, then it is a cK program it will evaluate by calling E.

The third argument z is either a stack or an atom.  This corresponds to the two ways o can be called.  If z is a stack, then it will compute a new stack.  If z is an atom then it is either 0, 1, or 2.  If z  is 0, o will return its name, for example \`"+".  If z  is 1, o will return the function it has been set up to compute, for example +.  If z is 2, o will return its valence.

A cK wrapper function w is also triadic, with arguments x, y, and z.

x is the valence of the function of the function w will compute.  For example, the valence of + is 2.

y is the actual function w will compute.  For example, {\_ x%y}.

z is either a stack or 0 or 1 (see above).

The job of a wrapper function is to take a stack, use the valence x to chop the stack into pieces, apply the function y to those pieces, and finally assemble the result into a new stack, which it then returns to o.

The parser is therefore the function:

```q
p:type token@
```

The parse of a cK code-string is a list all of whose functional atoms are projections of o.

### Evaluation

Evaluation is a dyadic function:

```q
{C::(,y),C;r:x a/y;C::1_ C;r}	
```

x is a stack and y is a parse-tree to be evaluated.  y is prepended to the list of continuations C. Elements of y are peeled off and applied to the stack to deliver a new stack. After y has been evaluated, the empty list of its continuation is dropped from C.

The 'a' function - the heart of the cK evaluator - is:

```q
a:{t[x;z];C[0]::1_*C;:[y&7=4:z;b/n z x;x,,z]}
```

The stack x and the element z to be evaluated are passed to t, the trace function.  The current continuation is truncated. Then, if z is a function and it's not quoted, we apply it to x and pass the result to n:

```q
n:{:[#x;(),x;()]
```

If x is non-null, make it a list, else make it () (instead of e.g. !0).  Else, if y is not a function, append it to the stack.

The 'b' function

```q
b:{:[N;()a[;1]/x;x]}
```

checks to see if N, the flag for self-evaluation, is on; if it is, the stack is repeatedly evaluated, one element at a time; if not, the stack is returned unaltered.

Otherwise, if z is not a function, or if z is quoted, it is appended to the stack.

### Continuations

Use 'conts' at any point to push the continuations C at that point onto the stack:

```q
-30 trace
[2 3 conts pop +] i
[2 3 conts pop +]
[2 3 conts pop +]       i
2
2       3
2 3       conts
2 3 [[pop +] []]       pop
2 3       +
5
```

Use 'callcc' to place the current continuation on the stack, followed by evaluation of a program:

```q
[2 3 [print] callcc 4 5] i + *
[4 5]
2 27
```

Use 'callc' to place all continuations on the stack, followed by evaluation of a program:

```q
[2 3 [print] callc + 4 5] i + *
[[+ 4 5] [+ *]]
45
```

### Display

Both the stack and the input queue are lists whose atoms are K objects. The cK representation of integers, floats, non-atomic strings, and symbols is indistinguishable from K's native representation -- 5:x. But lists and vectors use brackets and dispense with the ";" separator, atomic characters use "'", dictionaries use parentheses, and functions require special processing. 

## [Applications](#)

### Wolfram cellular automata, derived from [Eric Newhuis's K algorithm](http://www.kx.com/listbox/k/msg05713.html) 

```q
\ cellular automata in ck;

[8 2 # swap vs |:]				`rule 	def	\ 90 rule;
[dup 2 * &: 1 , !] 				`start 	def	\ 3 start -> 1 1 1 0 1 1 1;
[2 [0 , |:] do]					`sheet 	def	\ sheet;
[dup [*: [|: *:]] [i] right , -1 !.]		`cyl	def	\ cylinder;
[swap 2 list |:]				`rpair 	def	\ a b -> [b a];
[swap dup #: !: [rpair] dip [gen] right]	`ca 	def	\ 15 start 90 rule ca;
[_ 3 #. 2 swap sv @]				`cell 	def	\ x y z -> n;
[[1 unlist] dip swap sheet cell] 		`gen 	def	\ can substitute cyl for sheet;
[stack flatten " *" of sysout;]			`disp	def	\ display;

30 start 25 [90 rule ca] Do disp				\ 30 wide, 25 gens, rule 90;
```

```q
d:\ck>k ck sw
K 2.95t 2003-04-03 Copyright (C) 1993-2003 Kx Systems

\ for k, \\ to exit, .ck.i() for cK

*
* *
*   *
* * * *
*       *
* *     * *
*   *   *   *
* * * * * * * *
*               *
* *             * *
*   *           *   *
* * * *         * * * *
*       *       *       *
* *     * *     * *     * *
*   *   *   *   *   *   *   *
* * * * * * * * * * * * * * * *
*                               *
* *                             * *
*   *                           *   *
* * * *                         * * * *
*       *                       *       *
* *     * *                     * *     * *
*   *   *   *                   *   *   *   *
* * * * * * * *                 * * * * * * * *
*               *               *               *
* *             * *             * *             * *

```

[Slightly different code](../k/ck/sw2.ck) using the Joy words for K verbs: 

```q
[8 2 # swap vs reverse]                       `rule    def \ 90 rule;
[dup 2 * &: 1 concat !]                       `start   def \ 3 start -> 1 1 1 0 1 1 1;
[2 [0 concat reverse] do]                     `sheet   def \ could use a cylinder instead;
[swap 2 list reverse]                         `rpair   def \ a b -> [b a];
[swap dup size !: [rpair] dip [gen] right]    `ca      def \ 15 start 90 rule ca;
[swap drop 3 swap # 2 swap sv at]             `cell    def \ x y z -> n;
[[1 unlist] dip swap sheet cell]              `gen     def \ can substitute cyl for sheet;
[stack flatten " *" of sysout;]               `disp    def \ display;

30 start 25 [90 rule ca] Do disp                           \ 30 wide, 25 gens, rule 90;
```

### Conway's Game of Life

[The classic APL algorithm:.](../k/life.k)

```q
\ life in ck;

[2 [0 , +:] do]			`edge 	def	\ glue 0 to top, left;
[[|:] map |:]			`mirror def	\ t -> b, l -> r;
[2 [edge mirror] do]		`pad 	def	\ pad around matrix;

[[1 0 0]
[1 1 1]
[0 1 0]] 			`rpent 	set	\ r pentomino;

[1 !.]				`l	def	\ left shift;
[-1 !.]				`r 	def	\ right shift;

[[[[r] map r]
[[r] map l]
[[l] map r]
[[l] map l]
[[l] map  ]
[[r] map  ]
[r        ]
[l`	    ]] [i] right] 	`adj 	def	\ adjacencies;

[dup adj
[+] iterate dup 
3 = [2 = &] dip |] 		`next 	def	\ next generation;

[next dup " *" of sysout;] 	`life 	def	\ next, output;

[[sysin C ~] [life] while] 	`go	def	\ continue until input;

rpent 10 [pad] do go;
```

The 'go' function loops while, at each iteration, there is no input. That is, 'life' is executed and leaves the next generation on the stack. Then cK waits for input from the console. If the user presses Return, the empty string C is returned. If C matches the result, 'life' is executed again. And so forth, until the user types something into the console.

```q
d:\ck>k ck life
K 2.95t 2003-02-20 Copyright (C) 1993-2003 Kx Systems

\ for k, \\ to exit, .ck.i() for cK

rpent 5 [pad] do 5 [life] do		\ pad 5, five generations

*
* *
***











*
** *
* *
*










**
** *
** *
*










***
*
*  *
**









*
**
*  *
* *
**









**
***
*  *
** *
**

```

### Boolean Hexagonal Automata

Wolfram's "snowflake" automaton defined on a hexagonal lattice (see Coxe and Reiter's paper in [Vector](hex/Boolean%20Hexagonal%20Automata.htm) for an implementation in J, and [here](../k/hex.k) for a K implementation) is implemented in cK by adjusting the transition function 'next':

```q
[2 [0 , +:] do]					`edge 	def	\ glue 0 to top, left;
[[|:] map |:]					`mirror def	\ t -> b, l -> r;
[2 [edge mirror] do]				`pad 	def	\ pad around matrix;

[[[1]]]						`flake	def	\ simple snowflake;

[1 !.]						`l 	def	\ left shift;
[-1 !.]						`r 	def	\ right shift;

[[[[r] map r    ]
[[r] map l    ]
[[l] map r    ]
[[l] map l    ]
[[l] map      ]
[[r] map      ]
[r            ]
[l		]] [i] right] 			`adj 	def	\ adjacencies;

[dup 4 !: 
swap [*] 
swap mods [id id ~: ~:] [i] right 
amend4] 					`alt 	def	\ hexagonal neighbors;

[^: 1 @ !: 2 !]					`mods	def	\ 0 1 0 ..;

[dup adj alt [+] iterate 1 = |] 		`next 	def	\ next generation;

[dup #: [0 0 1 1] # swap unit cons [!] each]	`shift	def	\ shift pairs of rows;

[2 [[,: 2 #.] map flatten +:] do]		`double	def	\ double rows and cols;

[next dup double shift " *" of sysout;] 	`hex 	def	\ next, output;

[[sysin C ~] [hex] while] 			`go	def	\ continue until input;

flake 3 [pad] do go;
```

```q
**  **
**  **
****
****
**********
**********
****
****
**  **
**  **
```

### Table

[t.k](../k/t.k) is a set of single-table operations. [Recoded in cK](..\k\ck\t.ck):

```q
[[@:] [draw] [dup [#: draw] dip of] ifte]		`field	def	\ generate random field;
[[field] right 2 list +: .:]				`table	def	\ generate random table;

[[[t i] t N [i @] amend3] let] 				`rows 	def	\ table[;rows];
[[[t f g] N f [:] t g @ amend4] let] 			`cols 	def	\ table[cols;];

[[[t f o] N o t f @ 3 list [xyzx] iterate] let] 	`where 	def	\ where clause;
[[[x y z] z x @ y i x @.] let] 				`xyzx 	def	\ selection/order by;

[where]							`order	def	\ order and where are the same;
[>:]							`desc	def	\ grade down;
[<:]							`asc	def	\ grade up;

[[[d] d d [?:] map] let
[[d u] u [u d] [[?] right] each] let
[[u k] u [#:] map k sv] let
[[j] j ?: #: j] let
[[c u] [c u]] let]					`index	def	\ [..[vector]..] index;

[[[t k f o] 
k [o f] [[name $:] dip $: , `$.] each ,
t k f o t k @ index aggr
, 2 list +: .:] let]					`group	def	\ group by;

[[[t k f o i] [k last][+: +:]infra [t i xeq] each
[f o] [t i xeq] each] let]		`aggr	def	\ aggregate;

[[[f o t i]t f @ i uncons first o] let]			`xeq 	def	\ execute aggregation function;

[[[d n i] n &: i [+] 1 amend4] let]			`count	def;
[[[d n i] n d prototype # i [+] d amend4] let]		`sum	def;
[[[d n i] n d prototype # i [:] d amend4] let]		`last	def;
[[[d n i] d n i sum d n i count %] let]			`avg	def;
[[[d n i] n [] ,: # i [,] d amend4] let]		`part	def;

[[[t d] t N [,] d amend4] let]				`insert	def	\ table records insert -> table;
[[[t f i d] t [f i] [:] dmend4] let]			`update	def	\ table fields rows records update -> table;
[[[t i] t N [i di] amend3] let]				`delete def	\ table rows delete -> table;

[`F`G`H`I`J] 1000000 [[`a`b`c`d`e] 7 0 0 0] table 	`T 	def show time;
T [`G`F] [[desc] [asc]] order T swap rows 		`V 	def show time;
T [`F`G] [[[`a`b] lin &:] [5 = &:]] where T swap rows 	`U 	def show time;
T [`F`G] [`H`H`H`I] [count sum avg sum] group 		`W 	def show time;
```

Timing (five fields, a million records):

```q
d:\ck>k ck t
K 2.95t 2003-02-20 Copyright (C) 1993-2003 Kx Systems

\ for k, \\ to exit, .ck.i() for cK

t:0.1085069
t:0.253183
t:0.07233793
t:0.1085069
```

Lambdas are used both to reduce stack-noise and to document incoming elements. Compare 'index' above to the pure concatenative coding:

```q
[dup [?:] map 
dup rotate 2 list [[?] right] each
swap [#:] map swap sv
dup ?: #:
swap 2 list];
```

And the original K version of the algorithm:

```q
{[d](#?i;i:(#:'u)_sv(u:?:'d)?/:'d)}
```

Screenshots of T, U, V, and W:

![image](ck/t.png)


![image](ck/u.png)


![image](ck/v.png)


![image](ck/w.png)


### Transitive closure

From Raul Miller, on the K listbox:

```q
{[M]M|{|/M&x}'[M]}/
```

[Conversion to cK](../k/ck/tc.ck) (also from the listbox):

```q
-> {[M]M|M{|/x&y}/:M}/
-> {[M]M|M(|/&)/:M}/
```

That's about as far as we can take lambda-elimination in K, but in cK we can go all the way:

```q
[[dup dup [& [|] iterate] right |] converge] `tc def;
[3 3] [0 0 0 1] # tc
[[0 0 0] [1 0 0] [1 1 0]]
```

The program 'tc' finds M on the stack.  tc converges the program [p] = [dup dup [& [|] iterate] right |] on M.  p duplicates M twice, so we have M M M on the stack.  Then it does an each-right of the program [q] = [& [|] iterate] on the top two items M M, and or's that with the third item M.  Each invocation of q gets M and a row of M, on which it does an &, leaving a matrix result, on which the program [|] is iterated, leaving a vector.

### Queues

See [Manfred von Thun's paper on queue machines](http://www.latrobe.edu.au/philosophy/phimvt/misc/queue.html), and [this K implementation](../k/q.k) of both his algorithm and one which performs parallel evaluation of a queue. The parallel algorithm depends on the fact that in K f[a] is either the result of applying f to a if f is monadic, or the projection of f on a if the valence of f is greater than 1. Here is an [implementation in cK](../k/ck/q.ck):

```q
\ parallel queue machine;

[dup [q.o] map &: _. [q.p] map flatten] 	`q.q 		def;
[dup 1 _. reverse swap *: infra reverse] 	`q.p		def;
[|: *: type 7 =]				`q.o		def;
[[q.q] Converge]				`queue		def;
```

The analogue of a projection in cK is a list of size <= n whose last element is an operator of valence n. For example, the following are "projections" of a function f of valence 3\*:

```q
[1 f]
[1 2 f]
```

Since cK treats a short stack as an opportunity to project, the 'infra' combinator can be used to produce the analogue of the K behavior described above:

```q
10 20 30 unit [+] infra i
10 20 [30 +]
```

Examples:

```q
[+ 1 * 2 - 3 4] queue
[+ 1 * 2 - 3 4] [[1 +] [2 *] 1] [[1 +] 2] [3] []
```

```q
[* 5 + 6 % 7 8] queue
[* 5 + 6 % 7 8] [[5 *] [6 +] 1.142857] [[5 *] 7.142857] [35.71429] []
```

\* The definition of a projection in cK has been amended since this section was written: the analogue of a projection in cK is a function constructed on-the-fly by concatenating the stack with the primitive and enclosing the whole. The result is pushed onto the stack. The examples above should be changed to:

```q
[+ 1 * 2 - 3 4] queue
[[+ 1 * 2 - 3 4]] [[{1 +} {2 *} 1]] [[{1 +} 2]] [[3]] [[]]
```

```q
[* 5 + 6 % 7 8] queue
[[* 5 + 6 % 7 8]] [[{5 *} {6 +} 1.142857]] [[{5 *} 7.142857]] [[35.71429]] [[]]
```

### Truth Tables

[Here](http://www.latrobe.edu.au/philosophy/phimvt/joy/jp-trutab.html) is an implementation of the truth-table proof method by the author of Joy which uses sets. We'll use a different approach: for a formula F in n propositional letters P, Q, .., we define each letter to be a variable whose value is the reference column in the elementary truth-table for F, represented as a vector of 0's and 1's. For example, the formula "P Q and" contains two letters P and Q, so the variable P is 0 0 1 1 and the variable Q is 0 1 0 1. Once the variables have been defined, we execute the formula, relying on the fact that the truth-functional operators 'not, 'and', 'or', 'imp' and 'iff' are defined for arrays of any rank:

First, [the K solution](../k/tt.k):

```q
propositions:{@[_d;`$'x;:;2_vs!_2^#x];}
modality:{:[&/x;`tautology;&/~x;`contradiction;`contingent]}
letters:{?x@&x _lin"ABCDEFGHIJKLMNOPQRSTUVXYZ"}
prove:{propositions letters x;modality@. x}
```

The corresponding [cK solution](../k/ck/tt.ck):

```q
[dup #: 2 ^. _: !: 2 swap vs swap [` $.] map unit cons [set] each] 	`propositions 	def;
[dup "ABCDEFGHIJKLMNOPQRSTUVXYZ" lin &: @ ?:]				`letters	def; 
[dup letters propositions pop ck modality]				`prove		def;

[*: [&] iterate]							`tautology	def;
[~: tautology]								`contradiction	def;

[[[[tautology]		[pop `tautology]]
[[contradiction]	[pop `contradiction]]
[pop `contingent]] cond]			`modality	def;

[> ~:] 									`imp		def;
[[imp] [swap imp] cleave and popd] 					`iff 		def;
```

The main entry point is 'prove'. 'letters' extracts the propositional letters from the formula. 'propositions' takes a list of letters (e.g. "PQR") and for each letter creates a variable whose value is the appropriate reference column in the truth-table for P, Q, R. 'ck' is a primitive cK function which takes a string of cK code and executes it.

A proof of (P & (P -> Q)) -> Q:

```q
"P P Q imp and Q imp" prove
`tautology
```

```q
"PQ" propositions
[`P `Q]
pop
-30 trace
P P Q imp and Q imp
P
[0 0 1 1]
[0 0 1 1]       P
[0 0 1 1]       [0 0 1 1]
[0 0 1 1] [0 0 1 1]       Q
[0 0 1 1] [0 0 1 1]       [0 1 0 1]
[0 0 1 1] [0 0 1 1] [0 1 0 1]       imp
[0 0 1 1] [0 0 1 1] [0 1 0 1]       >
[0 0 1 1] [0 0 1 0]       ~:
[0 0 1 1] [1 1 0 1]       and
[0 0 0 1]       Q
[0 0 0 1]       [0 1 0 1]
[0 0 0 1] [0 1 0 1]       imp
[0 0 0 1] [0 1 0 1]       >
[0 0 0 0]       ~:
[1 1 1 1]
```

### Word wrap

The K function

```q
wrap:{(b -1_(-1+b _binl x+b:0,1+&" "=y)\0)_ y,:" "}
```

takes an integer x denoting maximum width and a string y and wraps the words in y into phrases of length <= x. For example,

```q
wrap[20;"this is a string consisting of words separated by blanks"]
("this is a string "
"consisting of "
"words separated by "
"blanks ")
```

here's how it works:

```q
y:"this has blanks in it"
x:10
```

```q
wrap[x;y]
("this has "
"blanks "
"in it ")
```

append a blank:

```q
y,:" "
y
"this has blanks in it "
```

indices of positions just following the blanks (pretend y 0 follows a blank):

```q
b:0,1+&" "=y
b
0 5 9 16 19 22
```

add maximum-substring-width:

```q
x+b
10 15 19 26 29 32
```

"bucketize" each of those:  e.g. 10 occurs in bucket b[3] (9 < 10 <= 16):

```q
b _binl x+b
3 3 4 6 6 6
```

subtract 1:

```q
-1+b _binl x+b
2 2 3 5 5 5
```

chase pointers (scan):  0 -> 2, 2 -> 3, 3 -> 5

```q
(-1+b _binl x+b)\0
0 2 3 5
```

drop off the last:

```q
-1_(-1+b _binl x+b)\0
0 2 3
```

index out the corresponding b-positions (1+where the blanks are in y):

```q
b -1_(-1+b _binl x+b)\0
0 9 16
```

cut the string into substrings at those positions:

```q
(b -1_(-1+b _binl x+b)\0)_ y
("this has "
"blanks "
"in it ")
```

[Translating into cK](../k/ck/wrap.ck) we have:

```q
[[" " , dup] dip swap " " = &: 1 + 0 ,.
dup [+] dip swap [dup] dip binl
-1 + 0 swap Converge
-1 _. @ _.] `wrap def;
```

```q
"this is a string consisting of words separated by blanks" 20 wrap sysout
this is a string
consisting of
words separated by
blanks
```

Using "shuffle notation" to make the stack-transitions explicit, and eliminating "stack noise", we have:

```q
[ "yx:yxy"   shuffle " " , " " = &: 1 + 0 ,. 
"yxb:ybbxb" shuffle + binl -1 + 0 
"ybz:yzb"   shuffle Converge -1 _. @ _.     ] `wrap def;
```

### Accumulator Generator

[Paul Graham's Accumulator Generator problem](http://www.paulgraham.com/accgen.html).

[Martin Young](http://groups.yahoo.com/group/concatenative/message/1408) found an elegant Joy solution to the "accumulator" part of the problem, slightly modified and implemented in cK as follows:

```q
[[+ acc] cons] `acc def;
newstack
3 acc
[3 + acc]
4 swap i
[7 + acc]
2 swap i
[9 + acc]
```

The "generator" part of the problem is now trivial:

```q
[[acc] *:] `gen def;
gen
acc
3 swap i
[3 + acc]
gen
[3 + acc] acc
4 swap i
[3 + acc] [4 + acc]
```

'gen' leaves an instance of 'acc' on the stack. Each instance accumulates independently.

### Shuffle

Shuffle takes a stack-pattern "from:to" and transforms the (-#?,/from)#stack from the pattern described by 'from' to the pattern described by 'to'.

Coding in K for maximum legibility:

```q
shuffle:{[s;f;t]  unpattern[t;dictionary pattern[f;s]]}

pattern:  {[f;s]  :[atomic f	;enlist(symbolize f;s)	;raze f pattern's]}
unpattern:{[t;d]  :[atomic t	;d symbolize t	    	;t unpattern'd]}

dictionary:.:
atomic:@:
symbolize:`$
raze:,/
enlist:,:
```

```q
shuffle[10 20 30;"abc";"cbabc"]
30 20 10 20 30
```

```q
shuffle[(10;20 30;40 50);("a";"bc";"d");("c";"da";"b")]
(30
(40 50
10)
20)
```

## [Open Questions](#)

### Replace all structural operators with 'shuffle'

cK/Joy contains a large number of operators each of which has a single, narrowly-defined effect on the top of the stack; e.g. pop, dup, swap; variants popop, dupd, swapd; rollup/down, rotate, cons, concat, and their variants; &c. Is there a way to replace this profusion of operators with a smaller, orthogonal set of operators? Better yet, can't we simply eliminate them, and use (a possibly enhanced version of) shuffle notation to achieve the same effects?

### Function atoms: shape and transformation

See the paper on [Function Arrays](fa.htm).

### Continuation-passing style

The execution regime used in the current implementation is (simplified):

```q
e:{x a/y}
a:{:[7=4:y;y x;x,,y]}
```

x being the result stack and y the program list to evaluate. e is called recursively, e.g. the 'i' combinator is:

```q
i:{e[x;y]}
```

Alternatively, we could use two stacks:

```q
e:{*{#x 1}{a . x}/(x;y)}
a:{i:*y;y:1_ y;t[x;i];:[7=4:i;@[i[x;y];0;n];(x,,i;y)]}	
```

where, if the next element on the program list is a function, it receives two arguments: the stack so far and the program-list yet to be evaluated (the current continuation).








