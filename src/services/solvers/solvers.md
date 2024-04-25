# Numerical solutions to ODE

Numerical solutions to Ordinary Differential Equations

## Euler integration method (Euler forward method)

https://en.wikipedia.org/wiki/Euler_method

$y_{n+1} = y_n + h \times f(t_n,y_n)$

=>

$k_1 = f(t_n,y_n)$

$y_{n+1} = y_n + h \times k_1$

## Midpoint method

https://en.wikipedia.org/wiki/Midpoint_method

$y_{n+1} = y_n + h \times f(t_n + \frac{h}{2} , y_n + \frac{h}{2} \times f(t_n,y_n) )$

=>

$k_1 = f(t_n,y_n)$

$k_2 = f(t_n + \frac{h}{2}, y_n + \frac{h}{2} \times k_1 )$

$y_{n+1} = y_n + h \times k_2$

## Runge kutta fourth order method (RK4)

https://en.wikipedia.org/wiki/Runge%E2%80%93Kutta_methods

$y_{n+1} = y_n + h \times f(t_n + \frac{h}{2} , y_n + \frac{h}{2} \times f(t_n,y_n) )$

=>

$k_1 = f(t_n,y_n)$

$k_2 = f(t_n + \frac{h}{2}, y_n + \frac{h}{2} \times k_1 )$

$k_3 = f(t_n + \frac{h}{2}, y_n + \frac{h}{2} \times k_2 )$

$k_4 = f(t_n + h, y_n + h \times k_3 )$

$y_{n+1} = y_n + h \times { k_1 + 2 \times k_2 + 2 \times k_3 + k_4 \over 6}$

## Gragg Bulirsch Stoer algorithm (GBS)

https://en.wikipedia.org/wiki/Bulirsch%E2%80%93Stoer_algorithm
