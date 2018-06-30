df <- read.csv('mlbootcamp5_train.csv', sep=';')
# 1. Какие два признака больше всего коррелируют (по Пирсону) с признаком height ?
library(corrplot)
C <- cor(df, method='pearson')
corrplot(C, method='color')
# Ответ: пол и вес

# 2. Постройте violinplot для роста и пола.
library(ggplot2)
df$gender <- as.factor(df$gender)
ggplot(df, aes(x=gender, y=height, fill = gender)) + geom_violin()

# 3. Какие признаки больше всего коррелируют (по Спирмену) друг с другом?
M <- cor(df, method='spearman')
corrplot(M, method='color')
# Ответ: верхнее и нижнее артериальные давления

# 4. Сколько чётко выраженных кластеров получилось на совместном графике выбранных признаков 
#    (верхнее и нижнее артериальные давления), с логарифмической шкалой?
ggplot(df, aes(x=ap_lo, y=ap_hi)) + geom_point() + 
  scale_y_log10() +
  scale_x_log10()
 # Ответ: больше 3

 # 5. Постройте Countplot, где на оси абсцисс будет отмечен возраст, на оси ординат – количество.
df$age_years = round(df$age / 365)
df$cardio = as.factor(df$cardio)
ggplot(df, aes(x = age_years, fill = cardio)) + stat_count()